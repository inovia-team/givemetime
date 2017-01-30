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
import ViewProject from '../viewProject/viewProject'

import './projectRow.css'

export class ProjectRowComponent extends Component {

    showAlert () {
        this.setState({ showAlert: true })
    }

    hideAlert () {
        this.setState({ showAlert: false })
    }

    deleteProject (userToken, id) {
        this.props.expandProjectToggle(id)
        this.props.deleteProject({ userToken, id })
    }

    constructor (props) {
        super(props)
        this.state = { showAlert: false }
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
        const { userId, userToken, project: { id, title, estimate, acquired, author, author_id }, expansion } = this.props
        const expanded = expansion.id === id && expansion.expanded
        return (
            <div className='project_row'>
                <ListItem
                    onClick={() => this.props.expandProjectToggle(id)}
                    innerDivStyle={{ display: 'flex', alignItems: 'center', paddingLeft: '0px', paddingRight: '0px' }}
                    hoverColor='#EEEEEE'
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
                    <img src={expanded ? UpArrow : DownArrow} />
                </ListItem>
                {expanded && (
                    <div className='dropdown_project'>
                        <div className='actions_layer'>
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
                        <ViewProject id={id} />
                    </div>
                )}
            </div>
        )
    }
}

ProjectRowComponent.propTypes = {
    project: ProjectPropTypes,
    deleteProject: PropTypes.func.isRequired,
    expandProjectToggle: PropTypes.func.isRequired,
    expansion: PropTypes.object,
    userToken: PropTypes.string,
    userId: PropTypes.number,
}
