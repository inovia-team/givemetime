import React, { PropTypes } from 'react'
import { RaisedButton } from 'material-ui'
import { Field } from 'redux-form'
import { TextField } from '../../../common/form'
import ProjectPropTypes from '../../project.propTypes'
import CircularProgressbar from 'react-circular-progressbar'

import './giveTime.css'

export function GiveTimeComponent ({ handleSubmit, userCredit, loadProject, project }) {
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
            <CircularProgressbar percentage={(acquired / estimate).toFixed(3) * 100} />
            <form onSubmit={handleSubmit}>
                <Field
                    id="amount" name="amount" type="number"
                    component={TextField}
                    label="Amount"
                /> out of {userCredit} credits.
                <br/>
                <Field id="projectId" name="projectId" type="hidden" component="input"/>
                <Field id="userToken" name="userToken" type="hidden" component="input" />
                <RaisedButton backgroundColor='#4CAF50' style={{ marginTop:'15px' }} onClick={handleSubmit} label="Give time"/>
            </form>
        </div>
    )
}


GiveTimeComponent.propTypes = {
    userCredit: PropTypes.number.isRequired,
    loadProject: PropTypes.func.isRequired,
    project: ProjectPropTypes,
    handleSubmit: PropTypes.func.isRequired,
}
