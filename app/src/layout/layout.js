import { connect } from 'react-redux'
import * as actions from './layout.actions'
import { bindActionCreators } from 'redux'
import { LayoutComponent } from './layout.view'

const mapStateToProps = state => {
    return {
        user: state.project.login.user,
        globalMenuOpen: state.project.layout.globalMenuOpen,
        apology: state.project.common.apology,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        globalMenuToggle: actions.globalMenuToggle,
        closeModal: actions.closeModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent)
