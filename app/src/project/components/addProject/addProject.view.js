import React, { PropTypes } from 'react'
import { RaisedButton } from 'material-ui'
import { Field } from 'redux-form'
import { TextField } from '../../../common/form'

export function AddProjectComponent ({ handleSubmit }) {
    return (
        <div>
            <h1>Add project</h1>

            <form onSubmit={handleSubmit}>
                <Field
                    id="author" name="author" type="text"
                    component={TextField}
                    disabled={true}
                    label="Author"
                />
                <br/>

                <Field
                    id="title" name="title" type="text"
                    component={TextField}
                    label="Project Name"
                />
                <br/>
                <Field
                    id="estimate" name="estimate" type="number"
                    component={TextField}
                    label="Estimated hours required"
                />
                <br/>
                <Field
                    id="description" name="description" type="text"
                    component={TextField}
                    label="Project's description"
                    multiLine={true}
                    rows={4}
                />
                <br/>
                <Field id="userToken" name="userToken" type="hidden" component="input" />
                <RaisedButton onClick={handleSubmit} label="Create project"/>
            </form>
        </div>
    )
}


AddProjectComponent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}