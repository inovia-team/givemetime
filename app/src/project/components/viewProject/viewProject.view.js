import React, { PropTypes, Component } from 'react'
import ProjectPropTypes from '../../project.propTypes'
import Inovia from '../../../../assets/inovia.png'
import CircularProgressbar from 'react-circular-progressbar'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import DownArrow from '../../../../assets/down-arrow.png'
import UpArrow from '../../../../assets/up-arrow.png'
import EditIcon from '../../../../assets/edit-icon.png'
import SaveIcon from '../../../../assets/save-icon.png'
import { TextEditor } from '../../../common/components/text-editor/text-editor'
import { TextField } from '../../../common/components/form'
import { Field } from 'redux-form'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'


import './viewProject.css'

export class ViewProjectComponent extends Component {

    showDesc () {
        this.setState({ showDesc: !this.state.showDesc })
    }

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

        const { id, title, author, acquired, estimate, description } = project
        return (
            <div className='view_project'>
                <form onSubmit={handleSubmit}>
                    <img style={{ float: 'right' }} onClick={() => this.editOrSave()} src={this.state.editing ? SaveIcon : EditIcon} />
                    <div className='header_view'>
                        <div className='basic_infos'>
                            <img className='logo_view' src={Inovia} />
                            {this.state.editing ? <Field
                                id="title" name="title" type="text"
                                component={TextField}
                                label={'Current title : ' + title}
                            /> : <h2 className='project_title'>{title}</h2>}
                            <p className='author'>By {author}</p>
                        </div>
                        <div className='progress'>
                            <CircularProgressbar percentage={Math.round((acquired / estimate) * 100)} />
                                {this.state.editing ? <Field
                                    id="estimate" name="estimate" type="number"
                                    component={TextField}
                                    label={'Current estimate : ' + estimate}
                                /> : <p className='time_required'>Time required : {acquired}/{estimate}h</p>}
                            <Link to={`/give/${id}`}><RaisedButton backgroundColor='#4CAF50' label={'Give Time'}/></Link>
                            <br/>
                        </div>
                    </div>
                    <div className='description'>
                        <div className='title_arrow'>
                            <h2 className='title_desc'>Description</h2>
                            <img className='arrow_desc' onClick={() => this.showDesc()} src={this.state.showDesc ? UpArrow : DownArrow} />
                        </div>
                        {this.state.showDesc && !this.state.editing && (<p dangerouslySetInnerHTML={this.createMarkup(description)}></p>)}
                        {this.state.editing && (
                            <div className='edit_desc'>
                                <Field
                                    id="description" name="description" type="text"
                                    component={TextEditor}
                                    data={JSON.parse(description)}
                                />
                                <br/>
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
