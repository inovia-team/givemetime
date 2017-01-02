import { combineReducers } from 'redux'
import layout from './layout/layout.reducers'
import login from './login/login.reducers'
import project from './project/project.reducers'
import common from './common/common.reducers'


const rootReducer = combineReducers({
    layout,
    login,
    project,
    common })

export default rootReducer
