import * as constants from './common.actionTypes'
import fetch from 'isomorphic-fetch'
import * as config from '../config'

export const PostRequest = (userToken, variables, route, onSuccess, onError) => {
    onSuccess = onSuccess || (a => a)
    return dispatch => {
        onError = onError || (a => dispatch(apologize(a)))
        let headers = { 'content-type': 'application/json' }
        if (userToken) {
            headers['authorization'] = `Bearer ${userToken}`
        }
        return fetch(`${config.API_URL}/${route}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(variables),
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
        .then(response => {
            if (response.errors) {
                onError(response.errors.map(err => err.message || err).join('. '))
            } else {
                onSuccess({ response })
            }
        })
    }
}

export const getGraphQL = (userToken, query, variables, onSuccess, onError) => {

}

export const GetRequest = (userToken, route, onSuccess, onError) => {
    onSuccess = onSuccess || (a => a)
    return dispatch => {
        onError = onError || (a => dispatch(apologize(a)))
        let headers = { 'content-type': 'application/json' }
        if (userToken) {
            headers['authorization'] = `Bearer ${userToken}`
        }
        return fetch(`${config.API_URL}/${route}`, {
            method: 'GET',
            headers: headers,
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
        .then(response => {
            console.log(response)
            if (response.errors) {
                onError(response.errors.map(err => err.message || err).join('. '))
            } else {
                onSuccess({ response })
            }
        })
    }
}

export const apologize = msg => ({
    type: constants.APOLOGIZE,
    message: msg,
})
