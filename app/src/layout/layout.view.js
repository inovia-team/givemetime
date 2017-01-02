import React, { PropTypes } from 'react'
import { AppBar, MenuItem, Drawer } from 'material-ui'
import LoginButton from '../login/login'
import { Link } from 'react-router'

// Use named export for unconnected component (for tests)
export class LayoutComponent extends React.Component {
    handleMenuClick () {
        this.props.globalMenuToggle(this.props.globalMenuOpen)
    }

    render () {
        const style = {
            margin: '30px 30px 30px 50px',
        }
        const content = this.props.user.id
            ? (
                <div style={style}>
                    {this.props.apology}
                    {this.props.children}
                </div>
            )
            : (
                <div style={style}>Login to view projects. {this.props.apology}</div>
            )

        return (
            <div>
                    <AppBar
                        title="Give R&D time"
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
        id: PropTypes.string,
        rowId: PropTypes.number,
    }).isRequired,
    globalMenuOpen: PropTypes.bool.isRequired,
    globalMenuToggle: PropTypes.func.isRequired,
    apology: PropTypes.string,
    children: PropTypes.element.isRequired,
}