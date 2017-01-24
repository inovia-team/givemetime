import React, { PropTypes, Component } from 'react'
import ProjectPropTypes from '../../project.propTypes'
import Inovia from '../../../../assets/inovia.png'
import CircularProgressbar from 'react-circular-progressbar'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import DownArrow from '../../../../assets/down-arrow.png'
import UpArrow from '../../../../assets/up-arrow.png'

import './viewProject.css'

export class ViewProjectComponent extends Component {

    showDesc () {
        this.setState({ showDesc: !this.state.showDesc })
    }

    constructor (props) {
        super(props)
        this.state = { showDesc: false }
    }

    render () {
        const { project, loadProject } = this.props

        if (!this.props.project) {
            loadProject()
            return (
                <div>Loading...</div>
            )
        }

        const { id, title, author, acquired, estimate, description } = project
        return (
            <div className='view_project'>
                <div className='header_view'>
                    <div className='basic_infos'>
                        <img className='logo_view' src={Inovia} />
                        <h2 className='project_title'>{title}</h2>
                        <p className='author'>By {author}</p>
                    </div>
                    <div className='progress'>
                        <CircularProgressbar percentage={Math.round((acquired / estimate) * 100)} />
                        <p className='time_required'>Time required : {acquired}/{estimate}h</p>
                        <Link to={`/give/${id}`}><RaisedButton backgroundColor='#4CAF50' label={'Give Time'}/></Link>
                        <br/>
                    </div>
                </div>
                <div className='description'>
                    <div className='title_arrow'>
                        <h2 className='title_desc'>Description</h2>
                        <img className='arrow_desc' onClick={() => this.showDesc()} src={this.state.showDesc ? UpArrow : DownArrow} />
                    </div>
                    {this.state.showDesc && (<p>{description}</p>)}
                </div>
            </div>
        )
    }
}

ViewProjectComponent.propTypes = {
    project: ProjectPropTypes,
    loadProject: PropTypes.func.isRequired,
}
