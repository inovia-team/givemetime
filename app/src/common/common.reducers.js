import * as constants from './common.actionTypes.js'

export default function (state = {}, action) {
    switch (action.type) {
    case constants.APOLOGIZE:
        return { ...state, apology: action.message }
    case constants.CHANGE_ORIENTATION:
        return { ...state, orientation: action.orientation }
    case constants.CLOSE_MODAL:
        return { ...state, apology: null }
    default:
        return state
    }
}
