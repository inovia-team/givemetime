import React, { PropTypes } from 'react'
import { IconButton, LinearProgress } from 'material-ui'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ProjectPropTypes from '../../project.propTypes'
import { Link } from 'react-router'
import { ListItem } from 'material-ui/List'


export function ProjectRowComponent ({ userToken, project: { id, title, estimate, acquired, author }, deleteProject }) {
    return (
        <ListItem
        >
            <div>{title} by {author}</div>
            <div>{acquired}h of {estimate}h {(acquired / estimate).toFixed(4) * 100}%</div>
            <LinearProgress max={estimate} min={0} value={acquired} mode="determinate"/>
        </ListItem>
    )
}

ProjectRowComponent.propTypes = {
    project: ProjectPropTypes,
    deleteProject: PropTypes.func.isRequired,
    userToken: PropTypes.string,
}
