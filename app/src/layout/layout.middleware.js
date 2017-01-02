import { menuToggle } from './layout.actions'

export const layoutMiddleware = store => next => action => {
    // close menu on page switch
    if (action.type === '@@router/LOCATION_CHANGE') {
        store.dispatch(menuToggle(false))
    }
    return next(action)
}