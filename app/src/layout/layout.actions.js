import * as constants from './layout.actionTypes.js'

export function globalMenuToggle (currentState) {
    return dispatch => {
        dispatch(menuToggle(!currentState))
    }
}

export const menuToggle = open => {
    return {
        type: constants.GLOBAL_MENU_TOGGLE,
        open: !!open,
    }
}
