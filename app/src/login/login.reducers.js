import * as loginActions from './login.actionTypes'
import * as giveTimeActions from '../project/components/giveTime/giveTime.actionTypes'

export default function (state = { user: {}, projects: [] }, action) {
    switch (action.type) {
    case loginActions.USER_LOGGED_IN:
        return { ...state, user: {
            id : action.id,
            credit: action.credit,
            fullname: action.fullname,
            avatar: action.avatar,
            token: action.token,
        } }
    case loginActions.USER_LOGGED_OUT:
        return { ...state, user: {
            id: null,
            fullname: null,
            credit : null,
            avatar: action.avatar,
            token: null,
        }, projects: [] }

    case giveTimeActions.GAVE_TIME:
        return { ...state,
            user: { ...state.user, credit: state.user.credit - action.amount },
        }
    default:
        return state
    }
}
