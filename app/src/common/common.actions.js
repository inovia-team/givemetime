import * as constants from './common.actionTypes'
import fetch from 'isomorphic-fetch'
import * as config from '../config'

export const RequestService = (method, userToken, variables, route, onSuccess, onError) => {
    onSuccess = onSuccess || (a => a)
    return dispatch => {
        onError = onError || (a => dispatch(apologize(a)))
        let headers = { 'content-type': 'application/json' }
        if (userToken) {
            headers['authorization'] = `Bearer ${userToken}`
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

export const apologize = msg => ({
    type: constants.APOLOGIZE,
    message: msg,
})
