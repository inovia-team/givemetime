import * as constants from './common.actionTypes.js'

export default function (state = { snackbar: { open: false, message: '' }, expansion: { id: null, expanded: false } }, action) {
    switch (action.type) {
    case constants.APOLOGIZE:
        return { ...state, apology: action.message }
    case constants.CHANGE_ORIENTATION:
        return { ...state, orientation: action.orientation }
    case constants.CLOSE_MODAL:
        return { ...state, apology: null }
    case constants.SHOW_SNACKBAR:
        return { ...state, snackbar: { open: true, message: action.message } }
    case constants.HIDE_SNACKBAR:
        return { ...state, snackbar: { open: false, message: '' } }
    case constants.EXPAND_PROJECT:
        return { ...state,
            expansion: { id: action.id, expanded: state.expansion.id === action.id ? !state.expansion.expanded : true },
        }
    default:
        return state
    }
}
