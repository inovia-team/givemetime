import React, { PropTypes } from 'react'
import ProjectRow from './components/projectRow/projectRow'
import ProjectPropTypes from './project.propTypes'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Snackbar from 'material-ui/Snackbar'
import { Link } from 'react-router'
import { List } from 'material-ui/List'

export class ProjectListComponent extends React.Component {
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
                <Link to={'/add'}>
                    <FloatingActionButton style={{ float: 'right' }}>
                      <ContentAdd />
                    </FloatingActionButton>
                </Link>
                { this.props.snackbar && <Snackbar
                  open={this.props.snackbar.open && !this.props.apology}
                  message={this.props.snackbar.message}
                  autoHideDuration={4000}
                  style={{ textAlign: 'center' }}
                  onRequestClose={this.props.handleRequestClose}
                /> }
            </div>
        )
    }
}

ProjectListComponent.propTypes = {
    projects: PropTypes.arrayOf(ProjectPropTypes).isRequired,
    loadProjects: PropTypes.func,
    handleRequestClose: PropTypes.func,
    apology: PropTypes.string,
    fromProfile: PropTypes.bool,
    snackbar: PropTypes.object,
}
