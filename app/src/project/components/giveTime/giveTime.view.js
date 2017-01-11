import React, { PropTypes, Component } from 'react'
import { RaisedButton } from 'material-ui'
import { Field } from 'redux-form'
import { TextField } from '../../../common/form'
import ProjectPropTypes from '../../project.propTypes'
import CircularProgressbar from 'react-circular-progressbar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import './giveTime.css'

export class GiveTimeComponent extends Component {

    showAlert () {
        this.setState({ showAlert: true })
    }

    hideAlert () {
        this.setState({ showAlert: false })
    }

    constructor (props) {
        super(props)
        this.state = { showAlert: false }
    }

    handleSubmit (event) {
        event.preventDefault()
        this.showAlert()
    }

    render () {
        const { handleSubmit, userCredit, loadProject, project, amount } = this.props
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.hideAlert()}
            />,
            <FlatButton
                label="Give time"
                primary={true}
                onTouchTap={() => handleSubmit()}
            />,
        ]

        if (! project) {
            loadProject()
            return (
                <div>Loading...</div>
            )
        }
        const { title, acquired, estimate } = project
        return (
            <div className='give_time'>
                <h1>Give Time to project {title}</h1>
                <CircularProgressbar percentage={Math.round((acquired / estimate) * 100)} />
                <p>{acquired} / {estimate}h</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Field
                        id="amount" name="amount" type="number"
                        component={TextField}
                        label="Amount"
                    /> out of {userCredit} credits.
                    <br/>
                    <Field id="projectId" name="projectId" type="hidden" component="input"/>
                    <Field id="userToken" name="userToken" type="hidden" component="input" />
                    <Dialog
                          actions={actions}
                          modal={false}
                          open={this.state.showAlert}
                          onRequestClose={() => this.hideAlert()}
                        >
                          <p>Are you sure that you want to give {amount} credits to the {title} project?</p>
                          <p>After the donation your credits amount will be <strong>{userCredit - amount}</strong> !</p>
                    </Dialog>
                    <RaisedButton backgroundColor='#4CAF50' style={{ marginTop:'15px' }} onClick={() => this.showAlert()} label="Give time"/>
                </form>
            </div>
        )
    }
}


GiveTimeComponent.propTypes = {
    amount: PropTypes.string,
    userCredit: PropTypes.number.isRequired,
    loadProject: PropTypes.func.isRequired,
    project: ProjectPropTypes,
    handleSubmit: PropTypes.func.isRequired,
}
