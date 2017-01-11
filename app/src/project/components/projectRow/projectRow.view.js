import React, { PropTypes, Component } from 'react'
import { LinearProgress } from 'material-ui'
import ProjectPropTypes from '../../project.propTypes'
import { Link } from 'react-router'
import { ListItem } from 'material-ui/List'
import DownArrow from '../../../../assets/down-arrow.png'
import UpArrow from '../../../../assets/up-arrow.png'
import Inovia from '../../../../assets/inovia.png'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import './projectRow.css'

export class ProjectRowComponent extends Component {

    showActions () {
        this.setState({ showActions: !this.state.showActions })
    }

    showAlert () {
        this.setState({ showAlert: true })
    }

    hideAlert () {
        this.setState({ showAlert: false })
    }

    deleteProject (userToken, id) {
        this.showActions()
        this.props.deleteProject({ userToken, id })
    }

    constructor (props) {
        super(props)
        this.state = { showActions: false, showAlert: false }
    }

    render () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.hideAlert()}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={() => this.deleteProject(userToken, id)}
            />,
        ]
        const { userId, userToken, project: { id, title, estimate, acquired, author, author_id } } = this.props
        return (
            <div className='project_row'>
                <ListItem
                    onClick={() => this.showActions()}
                    innerDivStyle={{ display: 'flex', alignItems: 'center' }}
                    hoverColor='#64B5F6'
                >
                <img className='logo_list' src={Inovia} />
                    <div className='basic_infos'>
                        <p>{title}</p>
                        <p className='author'>by {author}</p>
                    </div>
                    <div className='progress'>
                        <div className='percentage'>{acquired}h of {estimate}h {Math.round((acquired / estimate) * 100)}%</div>
                        <LinearProgress max={estimate} min={0} value={acquired} mode="determinate" style={{ height: '13px' }}/>
                    </div>
                    <img src={this.state.showActions ? UpArrow : DownArrow} />
                </ListItem>
                {this.state.showActions && (
                    <div className='actions_layer'>
                        <Link to={`/view/${id}`}><RaisedButton backgroundColor='#64B5F6' label={'View'}/></Link>
                        <Link to={`/give/${id}`}><RaisedButton backgroundColor='#4CAF50' label={'Give Time'}/></Link>
                        <Dialog
                              actions={actions}
                              modal={false}
                              open={this.state.showAlert}
                              onRequestClose={() => this.hideAlert()}
                            >
                              <p>Are you sure that you want to delete the {title} project?</p>
                        </Dialog>
                        {userId === author_id && <FontIcon onTouchTap={() => {
                            this.showAlert()

                        }} className="material-icons" color='#D84315' style={{ cursor: 'pointer' }}>delete</FontIcon>}
                    </div>
                )}
            </div>
        )
    }
}

ProjectRowComponent.propTypes = {
    project: ProjectPropTypes,
    deleteProject: PropTypes.func.isRequired,
    userToken: PropTypes.string,
    userId: PropTypes.number,
}
