import React, { PropTypes } from 'react'
import GoogleLogin from 'react-google-login'
import * as config from '../config'

export class LoginComponent extends React.Component {
    componentDidMount () {
        this.props.checkLocalUser()
    }
    render () {
        if (this.props.user.id) {
            return (
                <div>
                    {this.props.user.fullname}<br/> Crédits : {this.props.user.credit}<br/>
                    <button onClick={this.props.handleLogout}>Logout</button>
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
        id: PropTypes.string,
        fullname: PropTypes.string,
        credit: PropTypes.number,
    }).isRequired,
    handleLogout: PropTypes.func.isRequired,
    checkLocalUser: PropTypes.func.isRequired,
}
