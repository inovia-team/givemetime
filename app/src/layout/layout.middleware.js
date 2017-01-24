import { menuToggle } from './layout.actions'

export const layoutMiddleware = store => next => action => {
    // close menu on page switch
    if (action.type === '@@router/LOCATION_CHANGE') {
        /* Scroll to the top of the page to handle phone landscape mode */
        window.scrollTo(0, 0)
        store.dispatch(menuToggle(false))
    }
    return next(action)
}
