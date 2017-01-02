import * as constants from './layout.actionTypes.js'

export default function (state = { globalMenuOpen: false }, action) {
    switch (action.type) {
    case constants.GLOBAL_MENU_TOGGLE:
        return { ...state, globalMenuOpen: action.open }
    default:
        return state
    }
}