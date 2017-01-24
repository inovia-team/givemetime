import { connect } from 'react-redux'
import * as actions from './project.actions'
import { bindActionCreators } from 'redux'
import { ProjectListComponent } from './projectList.view'

const mapStateToProps = (state, ownProps) => {
    return {
        projects: ownProps.route.completed ?
            state.project.project.projects.filter(project => project.estimate === project.acquired) :
            state.project.project.projects.filter(project => project.estimate !== project.acquired),
        snackbar: state.project.project.snackbar,
        apology: state.project.common.apology,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        closeSnackbar: actions.closeSnackbar,
        loadProjects: actions.loadProjects }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent)
