import { connect } from 'react-redux'
import * as actions from './layout.actions'
import { bindActionCreators } from 'redux'
import { LayoutComponent } from './layout.view'
import { closeModal, goHomepage } from '../common/common.actions'

const mapStateToProps = state => {
    return {
        user: state.project.login.user,
        globalMenuOpen: state.project.layout.globalMenuOpen,
        apology: state.project.common.apology,
        snackbar: state.project.project.snackbar,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        globalMenuToggle: actions.globalMenuToggle,
        closeModal: closeModal,
        closeSnackbar: actions.closeSnackbar,
        goHomepage: goHomepage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent)
