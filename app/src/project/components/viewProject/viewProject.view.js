import React, { PropTypes, Component } from 'react'
import ProjectPropTypes from '../../project.propTypes'
import EditIcon from '../../../../assets/edit-icon.png'
import SaveIcon from '../../../../assets/save-icon.png'
import { TextEditor } from '../../../common/components/text-editor/text-editor'
import { Field } from 'redux-form'
import { stateToHTML } from '../../../common/draftjs-to-html/main'
import { convertFromRaw } from 'draft-js'

import './viewProject.css'

export class ViewProjectComponent extends Component {


    editOrSave () {
        this.state.editing && this.props.handleSubmit()
        this.setState({ editing: !this.state.editing })
    }

    constructor (props) {
        super(props)
        this.state = { showDesc: false, editing: false }
    }

    createMarkup (html) {
        return { __html: stateToHTML(convertFromRaw(JSON.parse(html))) }
    }

    render () {

        const { project, loadProject, handleSubmit } = this.props

        if (!this.props.project) {
            loadProject()
            return (
                <div>Loading...</div>
            )
        }

        const { description } = project
        return (
            <div className='view_project'>
                <form onSubmit={handleSubmit}>
                    <img style={{ float: 'right' }} onClick={() => this.editOrSave()} src={this.state.editing ? SaveIcon : EditIcon} />
                    <div className='description'>
                        <div className='title_arrow'>
                            <h2 className='title_desc'>Description</h2>
                            <img className='arrow_desc' />
                        </div>
                        {!this.state.editing && (<p dangerouslySetInnerHTML={this.createMarkup(description)}></p>)}
                        {this.state.editing && (
                            <div className='edit_desc'>
                                <Field
                                    id="description" name="description" type="text"
                                    component={TextEditor}
                                    data={JSON.parse(description)}
                                />
                                <br/>
                                <Field id="title" name="title" type="hidden" component="input"/>
                                <Field id="estimate" name="estimate" type="hidden" component="input"/>
                                <Field id="projectId" name="projectId" type="hidden" component="input"/>
                                <Field id="userToken" name="userToken" type="hidden" component="input" />
                                <Field id="userId" name="userId" type="hidden" component="input" />
                            </div>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

ViewProjectComponent.propTypes = {
    project: ProjectPropTypes,
    loadProject: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}
