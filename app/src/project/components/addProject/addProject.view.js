import React, { PropTypes } from 'react'
import { RaisedButton } from 'material-ui'
import { Field } from 'redux-form'
import { TextField } from '../../../common/form'
import { TextEditor } from '../../../common/components/text-editor/text-editor'

import './addProject.css'

export class AddProjectComponent extends React.Component {
    render () {
        const { handleSubmit } = this.props
        return (
            <div className='add_project_container'>
                <h1>Add project</h1>
                <form className='add_project_form' onSubmit={handleSubmit}>
                    Author : <Field
                        id="author" name="author" type="text"
                        component={TextField}
                        disabled={true}
                    />
                    <br/>
                    Project name : <Field
                        id="title" name="title" type="text"
                        component={TextField}
                        label="Ex : My super cool project"
                    />
                    <br/>
                    Estimate hours : <Field
                        id="estimate" name="estimate" type="number"
                        component={TextField}
                        label="Ex : 42"
                    />
                    <br/>
                    Description : <br/><br/><Field
                        id="description" name="description" type="text"
                        component={TextEditor}
                    />
                    <br/>
                    <Field id="userToken" name="userToken" type="hidden" component="input" />
                    <Field id="userId" name="userId" type="hidden" component="input" />
                    <RaisedButton type="submit" onClick={handleSubmit} label="Create project"/>
                </form>
            </div>
        )
    }
}


AddProjectComponent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}
