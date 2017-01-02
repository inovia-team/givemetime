import { connect } from 'react-redux'
import * as actions from './addProject.actions'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { replace } from 'react-router-redux'
import { AddProjectComponent } from './addProject.view'

const mapStateToProps = state => {
    return {
        initialValues: {
            author: state.project.login.user.fullname,
            userToken: state.project.login.user.token,
        },
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onSubmit: actions.createProject,
    }, dispatch)
}

const onSubmitSuccess = (result, dispatch) => {
    dispatch(replace('/'))
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'addProject',
        onSubmitSuccess,
    })(AddProjectComponent)
)