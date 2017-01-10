import React, { PropTypes } from 'react'
import { AppBar, MenuItem, Drawer } from 'material-ui'
import Dialog from 'material-ui/Dialog'
import LoginButton from '../login/login'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import './layout.style.css'

// Use named export for unconnected component (for tests)
export class LayoutComponent extends React.Component {
    handleMenuClick () {
        this.props.globalMenuToggle(this.props.globalMenuOpen)
    }

    render () {
        const actions = [
            <FlatButton
                label="Okay"
                primary={true}
                onTouchTap={this.props.closeModal}
            />,
        ]
        const content = this.props.user.id
            ? (
                <div className="layout">
                    <Dialog
                         title="Error !"
                         actions={actions}
                         modal={false}
                         open={this.props.apology != null}
                         onRequestClose={this.props.closeModal}
                       >
                        {this.props.apology}
                   </Dialog>
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
