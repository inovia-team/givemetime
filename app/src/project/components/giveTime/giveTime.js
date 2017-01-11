import { connect } from 'react-redux'
import { giveTime } from './giveTime.actions'
import { loadProject } from '../../project.actions'
import { reduxForm, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { replace } from 'react-router-redux'
import { GiveTimeComponent } from './giveTime.view'

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.project.project.projects.find(project => project.id == ownProps.params.id),
        userCredit: state.project.login.user.credit,
        initialValues: {
            projectId: ownProps.params.id,
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


var giveProjectForm = reduxForm({
    form: 'giveProjectDialog',
    onSubmitSuccess,
})(GiveTimeComponent)

// We use a selector to get the amount of credits entered so we can display message according to the actual amount

const selector = formValueSelector('giveProjectDialog')
giveProjectForm = connect(
    state => {
        const amount = selector(state, 'amount')
        return {
            amount,
        }
    }
)(giveProjectForm)

export default connect(mapStateToProps, mapDispatchToProps)(giveProjectForm)
