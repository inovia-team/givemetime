import { getGraphQL, apologize } from '../common/common.actions'
import * as constant from './login.actionTypes'
import fetch from 'isomorphic-fetch'
import * as config from '../config'

const USER_TOKEN_KEY = 'userAuth'

function logUserInWithTokenAndId (dispatch, id, token) {
    dispatch(getGraphQL(null, `
            query findPersonById($id: ID!) {
              person(id: $id) {
                id,
                rowId,
                fullname
                credit
                createdAt
              }
            }
        `,
        { id },
        ({ person }) => {
            dispatch(userLoggedIn(token, person.id, person.rowId, person.fullname, person.credit))
            // TODO: use a middleware to dispatch non-pure functions
            dispatch(() => {
                localStorage.setItem(USER_TOKEN_KEY, JSON.stringify({ user_id: id, token }))
            })
        }
    ))
}

export function failureError (response) {
    return dispatch => {
        dispatch(apologize('Can\'t log in. Error : ' + response))
    }
}

export function createUserIfNotExists (response) {
    const access_token = response.accessToken
    return dispatch => {
        // auth the user and get a token
        return fetch(`${config.API_URL}/jwt_auth`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ access_token }),
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
            return Promise.reject(response)
        })
        .catch(err => {
            if (err.json) {
                return err.json()
            }
            return { errors: [ err ] }
        })
        .then(jwtResponse => {
            if (jwtResponse.errors) {
                apologize(jwtResponse.errors.map(err => err.message || err).join('. '))
            } else {
                logUserInWithTokenAndId(dispatch, jwtResponse.user_id, jwtResponse.token)
            }
        })
    }
}



export function handleLogout () {
    return dispatch => {
        dispatch(userLoggedOut())
        localStorage.removeItem(USER_TOKEN_KEY)
    }
}

export function checkLocalUser () {
    return dispatch => {
        // if the user is "google" logged in and an id is present in localstorage,
        // we try to fetch user from graphql and dispatch the userLoggedInAction

        const userAuth = JSON.parse(localStorage.getItem(USER_TOKEN_KEY) || 'null')

        // we need to wait google auth lib to be loaded
        const waitGoogleAuthLoaded = () => {

            if (process.env.GOOGLE_AUTH_MOCK) {
                logUserInWithTokenAndId(dispatch, userAuth.user_id, userAuth.token)
            } else if (window.gapi && window.gapi.auth2) {
                const auth2Instance = window.gapi.auth2.getAuthInstance()
                auth2Instance.isSignedIn.listen(loggedIn => {
                    if (loggedIn) {
                        logUserInWithTokenAndId(dispatch, userAuth.user_id, userAuth.token)
                    }
                    else {
                        // the user has logged out Google Account stuff, clean local storage
                        localStorage.removeItem(USER_TOKEN_KEY)
                    }
                })
            }
            else {
                setTimeout(waitGoogleAuthLoaded, 50)
            }
        }

        if (userAuth) {
            return waitGoogleAuthLoaded()
        }
    }
}

export const userLoggedIn = (token, id, rowId, fullname, credit) => {
    return {
        type: constant.USER_LOGGED_IN,
        token, id, rowId, fullname, credit,
    }
}

export const userLoggedOut = () => {
    return {
        type: constant.USER_LOGGED_OUT,
    }
}