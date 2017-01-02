import { connect } from 'react-redux'
import * as actions from './login.actions'
import { bindActionCreators } from 'redux'
import { LoginComponent } from './login.view'

const mapStateToProps = state => {
    return {
        user: state.project.login.user,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleLogout: actions.handleLogout,
        failureError: actions.failureError,
        createUserIfNotExists: actions.createUserIfNotExists,
        checkLocalUser: actions.checkLocalUser,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
