import * as constants from './common.actionTypes.js'

export default function (state = {}, action) {
    switch (action.type) {
    case constants.APOLOGIZE:
        return { ...state, apology: action.message }
    default:
        return state
    }
}