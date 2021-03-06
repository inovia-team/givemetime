import * as constants from './common.actionTypes'
import fetch from 'isomorphic-fetch'
import * as config from '../config'
import { replace } from 'react-router-redux'

export const RequestService = (method, userToken, variables, route, onSuccess, onError) => {
    onSuccess = onSuccess || (a => a)
    return dispatch => {
        onError = onError || (a => dispatch(apologize(a)))
        let headers = { 'content-type': 'application/json' }
        if (userToken) {
            headers['authorization'] = userToken
        }
        return fetch(`${config.API_URL}/${route}`, {
            method: method,
            headers: headers,
            body: variables ? JSON.stringify(variables) : null,
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
            return { error: err }
        })
        .then(response => {
            if (response.error) {
                return onError(response.error.message)
            } else {
                return onSuccess({ response })
            }
        })
    }
}

export const changeOrientation = orientation => ({
    type: constants.CHANGE_ORIENTATION,
    orientation: orientation,
})

export const apologize = msg => ({
    type: constants.APOLOGIZE,
    message: msg,
})

export function closeModal () {
    return dispatch => {
        dispatch(closeModalAction())
    }
}

export function goHomepage () {
    return dispatch => {
        dispatch(replace('/'))
    }
}

export const closeModalAction = () => {
    return {
        type: constants.CLOSE_MODAL,
    }
}

export function hideSnackBar () {
    return dispatch => {
        dispatch(closeSnackbar)
    }
}

export const closeSnackbar = () => {
    return {
        type: constants.HIDE_SNACKBAR,
    }
}

export const showSnackbar = message => {
    return {
        type: constants.SHOW_SNACKBAR,
        message: message,
    }
}


export function expandProjectToggle (id) {
    return dispatch => {
        dispatch(expandProject(id))
    }
}

export const expandProject = id => {
    return {
        type: constants.EXPAND_PROJECT,
        id: id,
    }
}
