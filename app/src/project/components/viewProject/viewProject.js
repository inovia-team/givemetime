import { connect } from 'react-redux'
import { ViewProjectComponent } from './viewProject.view'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import * as actions from '../../project.actions'

function mapStateToProps (state, ownProps) {
    const project = state.project.project.projects.find(project => project.id == ownProps.params.id)
    return {
        project: project,
        initialValues: {
            author: state.project.login.user.fullname,
            userToken: state.project.login.user.token,
            userId: state.project.login.user.id,
            title: project && project.title,
            estimate: project && project.estimate,
        },
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        loadProject: actions.loadProject(ownProps.params.id),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'editProject',
    })(ViewProjectComponent)
)
