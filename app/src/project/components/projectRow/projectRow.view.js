import React, { PropTypes } from 'react'
import { IconButton, LinearProgress } from 'material-ui'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import ProjectPropTypes from '../../project.propTypes'
import { Link } from 'react-router'

export function ProjectRowComponent ({ userToken, project: { id, rowId, title, estimate, acquired, author }, deleteProject }) {
    return (
      <Card expanded={null} expandable={false} initiallyExpanded={false}>
          <CardHeader title={title} subtitle={author}/>
          <CardText>
              <div>{acquired}h of {estimate}h {(acquired / estimate).toFixed(4) * 100}%</div>
              <LinearProgress max={estimate} min={0} value={acquired} mode="determinate"/>
          </CardText>
          <CardActions>
              <Link to={`/view/${id}`}>View</Link>
              <Link to={`/give/${id}/${rowId}`}>Give Time</Link>
              <IconButton onTouchTap={() => deleteProject({ rowId, userToken })}>
                  <ActionDelete />
              </IconButton>
          </CardActions>
      </Card>
    )
}

ProjectRowComponent.propTypes = {
    project: ProjectPropTypes,
    deleteProject: PropTypes.func.isRequired,
    userToken: PropTypes.string,
}