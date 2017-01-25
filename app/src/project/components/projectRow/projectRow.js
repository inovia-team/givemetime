import { connect } from 'react-redux'
import * as actions from './projectRow.actions'
import * as commonActions from '../../../common/common.actions'
import { bindActionCreators } from 'redux'
import { ProjectRowComponent } from './projectRow.view'

const mapStateToProps = state => {
    return {
        userToken: state.project.login.user.token,
        userId: state.project.login.user.id,
        expansion: state.project.common.expansion,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteProject: actions.deleteProject,
        expandProjectToggle: commonActions.expandProjectToggle,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRowComponent)
