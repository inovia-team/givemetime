import { showSnackbar } from './project.actions'
import { PROJECT_CREATED } from './components/addProject/addProject.actionTypes'
import { GAVE_TIME } from './components/giveTime/giveTime.actionTypes'
import { USER_LOGGED_OUT } from '../login/login.actionTypes'

export const snackbarMiddleware = store => next => action => {
    // close menu on page switch
    switch (action.type) {
    case PROJECT_CREATED:
        store.dispatch(showSnackbar('Project created with success !'))
        break
    case GAVE_TIME:
        store.dispatch(showSnackbar('Thank you for sharing your time !'))
        break
    case USER_LOGGED_OUT:
        store.dispatch(showSnackbar('Logged out. Hope to see you again soon :) !'))
        break
    }
    return next(action)
}
