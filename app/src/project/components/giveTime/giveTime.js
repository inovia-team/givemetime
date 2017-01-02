import { connect } from 'react-redux'
import { giveTime } from './giveTime.actions'
import { loadProject } from '../../project.actions'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { replace } from 'react-router-redux'
import { GiveTimeComponent } from './giveTime.view'

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.project.project.projects.find(project => project.id === ownProps.params.id),
        userCredit: state.project.login.user.credit,
        initialValues: {
            userId: state.project.login.user.id,
            projectRowId: ownProps.params.rowId,
            userToken: state.project.login.user.token,
        },
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        onSubmit: giveTime,
        loadProject: loadProject(ownProps.params.id),
    }, dispatch)
}

const onSubmitSuccess = (result, dispatch) => {
    dispatch(replace('/'))
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'giveProjectDialog',
        onSubmitSuccess,
    })(GiveTimeComponent)
)