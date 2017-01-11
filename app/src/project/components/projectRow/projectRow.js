import { connect } from 'react-redux'
import * as actions from './projectRow.actions'
import { bindActionCreators } from 'redux'
import { ProjectRowComponent } from './projectRow.view'

const mapStateToProps = state => {
    return {
        userToken: state.project.login.user.token,
        userId: state.project.login.user.id,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteProject: actions.deleteProject,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRowComponent)
