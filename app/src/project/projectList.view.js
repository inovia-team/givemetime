import React, { PropTypes } from 'react'
import ProjectRow from './components/projectRow/projectRow'
import { Responsive, WidthProvider } from 'react-grid-layout'
import ProjectPropTypes from './project.propTypes'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export class ProjectListComponent extends React.Component {

    componentDidMount () {
        this.props.loadProjects()
    }
    render () {
        const layout = this.props.projects.map((project, i) => {
            return {
                i: '' + i,
                x: i % 3,
                y: Math.floor(i / 3),
                w: 1,
                h: 1,
                static: true,
            }
        })
        return (
            <ResponsiveReactGridLayout
                className="layout"
                layouts={{ lg: layout, md: layout, sm: layout }}
                breakpoints={{ lg: 1200, md: 480, sm: 0 }}
                cols={{ lg: 3, md: 2, sm: 1 }}
                rowHeight={170}
                autoSize={true}
              >
                 {this.props.projects.map((project, i) =>
                    <div key={i}>
                        <ProjectRow project={project} />
                    </div>
                )}
            </ResponsiveReactGridLayout>
        )
    }
}

ProjectListComponent.propTypes = {
    projects: PropTypes.arrayOf(ProjectPropTypes.isRequired).isRequired,
    loadProjects: PropTypes.func.isRequired,
}
