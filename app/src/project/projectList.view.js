import React, { PropTypes } from 'react'
import ProjectRow from './components/projectRow/projectRow'
import ProjectPropTypes from './project.propTypes'
import { List } from 'material-ui/List'

export class ProjectListComponent extends React.Component {

    componentDidMount () {
        if (!this.props.fromProfile)
            this.props.loadProjects()
    }
    render () {
        return (
            <List
              >
                 { this.props.projects.length && this.props.projects.map((project, i) =>
                    <div key={i}>
                        <ProjectRow project={project} />
                    </div>
                )}
            </List>
        )
    }
}

ProjectListComponent.propTypes = {
    projects: PropTypes.arrayOf(ProjectPropTypes).isRequired,
    loadProjects: PropTypes.func,
    fromProfile: PropTypes.bool,
}
