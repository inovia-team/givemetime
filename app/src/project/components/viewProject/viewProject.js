import { connect } from 'react-redux'
import { ViewProjectComponent } from './viewProject.view'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import * as actions from '../../project.actions'
import { editProject } from './viewProject.actions'

function mapStateToProps (state, ownProps) {
    const project = state.project.project.projects.find(project => project.id == ownProps.id)
    return {
        project: project,
        userId: state.project.login.user.id,
        initialValues: {
            projectId: ownProps.id,
            estimate: project.estimate,
            title: project.title,
            userToken: state.project.login.user.token,
        },
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        loadProject: actions.loadProject(ownProps.id),
        onSubmit: editProject,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'editProject',
    })(ViewProjectComponent)
)
