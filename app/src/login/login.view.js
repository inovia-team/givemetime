import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import GoogleLogin from 'react-google-login'
import * as config from '../config'

import './login.css'

export class LoginComponent extends React.Component {
    componentDidMount () {
        this.props.checkLocalUser()
    }
    render () {
        if (this.props.user.id) {
            return (
                <div className='logged_appbar_section'>
                    <Avatar src={this.props.user.avatar} />
                    <div className='user_infos'>{this.props.user.fullname}<br/> Crédits : {this.props.user.credit}</div>
                    <RaisedButton onClick={this.props.handleLogout} style={{ padding: '3px' }} label={'Logout'}/>
                </div>
            )
        } else if (process.env.GOOGLE_AUTH_MOCK) {
            return (
                <button
                    onClick={this.props.createUserIfNotExists.bind(this)}>
                    Login
                </button>
            )
        } else {
            return (
                <GoogleLogin
                    clientId={config.GOOGLE_KEY}
                    buttonText="Login"
                    onSuccess={this.props.createUserIfNotExists.bind(this)}
                    onFailure={this.props.failureError.bind(this)}>
                    <script></script>
                    Login
                </GoogleLogin>
            )
        }
    }
}

LoginComponent.propTypes = {
    createUserIfNotExists: PropTypes.func.isRequired,
    failureError: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.int,
        fullname: PropTypes.string,
        credit: PropTypes.number,
        avatar: PropTypes.string,
    }).isRequired,
    handleLogout: PropTypes.func.isRequired,
    checkLocalUser: PropTypes.func.isRequired,
}
