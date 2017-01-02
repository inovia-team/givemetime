import React, { PropTypes } from 'react'
import ProjectPropTypes from '../../project.propTypes'
import { LinearProgress } from 'material-ui'

export function ViewProjectComponent ({ project, loadProject }) {
    if (! project) {
        loadProject()
        return (
            <div>Loading...</div>
        )
    }

    const { title, author, acquired, estimate, description } = project
    return (
        <div>
            <h1>{title + ' by ' + author}</h1>
            <div>
                Time required : {acquired}/{estimate}
                <br/>
                <LinearProgress max={estimate} min={0} value={acquired} mode="determinate"/>
            </div>
            <p>
                Description : {description}
            </p>
        </div>
    )
}

ViewProjectComponent.propTypes = {
    project: ProjectPropTypes,
    loadProject: PropTypes.func.isRequired,
}
