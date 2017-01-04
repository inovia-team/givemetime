import React, { PropTypes } from 'react'
import { IconButton, LinearProgress } from 'material-ui'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import ProjectPropTypes from '../../project.propTypes'
import { Link } from 'react-router'

export function ProjectRowComponent ({ userToken, userId, project: { id, title, estimate, acquired, author }, deleteProject }) {
    return (
      <Card expanded={null} expandable={false} initiallyExpanded={false}>
          <CardHeader title={title} subtitle={author}/>
          <CardText>
              <div>{acquired}h of {estimate}h {(acquired / estimate * 100).toFixed(2)}%</div>
              <LinearProgress max={estimate} min={0} value={acquired} mode="determinate"/>
          </CardText>
          <CardActions>
              <Link to={`/view/${id}`}>View</Link>
              <Link to={`/give/${id}`}>Give Time</Link>
              <IconButton onTouchTap={() => deleteProject({ userToken, id, userId })}>
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
    userId: PropTypes.number,
}
