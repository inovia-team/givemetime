import { connect } from 'react-redux'
import { handleLogout } from '../login/login.actions'
import { bindActionCreators } from 'redux'
import { loadProjects } from '../project/project.actions.js'
import { ProfileComponent } from './profile.view'

const mapStateToProps = state => {
    return {
        user: state.project.login.user,
        myProject: state.project.project.projects.filter(project => project.author_id === state.project.login.user.id),
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleLogout: handleLogout,
        loadProjects: loadProjects,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)
