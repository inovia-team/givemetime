import React, { PropTypes, Component } from 'react'
import { LinearProgress } from 'material-ui'
import ProjectPropTypes from '../../project.propTypes'
import { Link } from 'react-router'
import { ListItem } from 'material-ui/List'
import DownArrow from '../../../../assets/down-arrow.png'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

import './projectRow.css'

export class ProjectRowComponent extends Component {

    showActions () {
        this.setState({ showActions: !this.state.showActions })
    }

    constructor (props) {
        super(props)
        this.state = { showActions: false }
    }

    render () {
        const { userToken, project: { id, title, estimate, acquired, author }, deleteProject } = this.props
        return (
            <div>
                <ListItem
                    onClick={() => this.showActions()}
                    innerDivStyle={{ display: 'flex', alignItems: 'center' }}
                    hoverColor='#64B5F6'
                >
                    <div className='basic_infos'>
                        <p>{title}</p>
                        <p className='author'>by {author}</p>
                    </div>
                    <div className='progress'>
                        <div className='percentage'>{acquired}h of {estimate}h {(acquired / estimate).toFixed(4) * 100}%</div>
                        <LinearProgress max={estimate} min={0} value={acquired} mode="determinate"/>
                    </div>
                    <img src={DownArrow} />
                </ListItem>
                {this.state.showActions && (
                    <div className='actions_layer'>
                        <Link to={`/view/${id}`}><RaisedButton backgroundColor='#64B5F6' label={'View'}/></Link>
                        <Link to={`/give/${id}`}><RaisedButton backgroundColor='#4CAF50' label={'Give Time'}/></Link>
                        <FontIcon onTouchTap={() => {
                            this.showActions()
                            deleteProject({ userToken, id })
                        }} className="material-icons" color='#D84315' style={{ cursor: 'pointer' }}>delete</FontIcon>
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
}
