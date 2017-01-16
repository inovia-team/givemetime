import React, { PropTypes } from 'react'
import { AppBar, MenuItem, Drawer } from 'material-ui'
import LoginButton from '../login/login'
import { Link } from 'react-router'
import Modal from 'react-modal'
import closeImg from '../../assets/cross.png'
import './layout.style.css'

// Use named export for unconnected component (for tests)
export class LayoutComponent extends React.Component {
    handleMenuClick () {
        this.props.globalMenuToggle(this.props.globalMenuOpen)
    }

    render () {
        const content = this.props.user.id
            ? (
                <div className="layout">
                    <Modal
                        isOpen={this.props.apology != null}
                        className="modalStyle"
                        contentLabel="Modal"
                    >
                        <div className="error_header">
                            <h2>Error !</h2>
                            <img src={closeImg} onClick={this.props.closeModal}/>
                        </div>
                        <p>{this.props.apology}</p>
                </Modal>
                    {this.props.children}
                </div>
            )
            : (
                <div className="layout">Login to view projects. {this.props.apology}</div>
            )

        return (
            <div>
                    <AppBar
                        title="Give R&D time"
                        titleStyle={{ cursor: 'pointer' }}
                        onTitleTouchTap={() => this.props.goHomepage()}
                        onLeftIconButtonTouchTap={() => this.handleMenuClick()}
                        iconElementRight={<LoginButton />}
                    />
                <div>
                    <Drawer
                        docked={false}
                        width={300}
                        open={this.props.globalMenuOpen}
                        onRequestChange={() => this.handleMenuClick()}
                    >
                        <AppBar
                            title="Give R&D time"
                            onLeftIconButtonTouchTap={() => this.handleMenuClick()}
                        />
                        <MenuItem
                            containerElement={<Link to ="/" />}>Projects</MenuItem>
                        <MenuItem
                            containerElement={<Link to ="/add" />}>Add Project</MenuItem>
                        <MenuItem
                            containerElement={<Link to ="/me" />}>My account</MenuItem>
                    </Drawer>
                </div>
                { content }
            </div>
        )
    }
}

LayoutComponent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
    }).isRequired,
    globalMenuOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    goHomepage: PropTypes.func.isRequired,
    globalMenuToggle: PropTypes.func.isRequired,
    apology: PropTypes.string,
    children: PropTypes.element.isRequired,
}
