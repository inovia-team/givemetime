import React, { PropTypes } from 'react'
import ProjectRow from './components/projectRow/projectRow'
import ProjectPropTypes from './project.propTypes'
import TextField from 'material-ui/TextField'
import { List } from 'material-ui/List'

export class ProjectListComponent extends React.Component {@
    constructor (props) {
        super(props)
        this.state = {
            filter: '',
        }
    }

    handleChangeText (x, event) {
        this.setState({ filter: event })
    }

    componentDidMount () {
        if (!this.props.fromProfile)
            this.props.loadProjects()
    }
    render () {
        return (
            <div>
                <TextField
                  hintText="Filter projects by name"
                  onChange={(x, event) => this.handleChangeText(x,event)}
                  fullWidth={true}
                />
                <List
                  >
                     { this.props.projects.length && this.props.projects.filter(project => project.title.toLowerCase().includes(this.state.filter.toLowerCase())).map((project, i) =>
                        <div key={i}>
                            <ProjectRow project={project} />
                        </div>
                    )}
                </List>
            </div>
        )
    }
}

ProjectListComponent.propTypes = {
    projects: PropTypes.arrayOf(ProjectPropTypes).isRequired,
    loadProjects: PropTypes.func,
    fromProfile: PropTypes.bool,
}
