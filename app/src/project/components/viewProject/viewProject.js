import { connect } from 'react-redux'
import { ViewProjectComponent } from './viewProject.view'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import * as actions from '../../project.actions'
import { editProject } from '../addProject/addProject.actions'

function mapStateToProps (state, ownProps) {
    const project = state.project.project.projects.find(project => project.id == ownProps.params.id)
    return {
        project: project,
        initialValues: {
            projectId: ownProps.params.id,
            userToken: state.project.login.user.token,
            userId: state.project.login.user.id,
        },
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        loadProject: actions.loadProject(ownProps.params.id),
        onSubmit: editProject,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'editProject',
    })(ViewProjectComponent)
)
