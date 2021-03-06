import * as projectActions from './project.actionTypes'
import * as giveTimeActions from './components/giveTime/giveTime.actionTypes'
import * as projectRowActions from './components/projectRow/projectRow.actionTypes'
import * as addProjectActions from './components/addProject/addProject.actionTypes'
import * as viewProjectActions from './components/viewProject/viewProject.actionTypes'

export default function (state = { projects: [] }, action) {
    switch (action.type) {

    case projectActions.PROJECT_FETCHED:
        return { ...state,
            projects: state.projects
                .filter(project => project.id !== action.id)
                .concat([{
                    id: action.id,
                    title: action.title,
                    estimate: action.estimate,
                    acquired: action.acquired,
                    description: action.description,
                    author: action.author,
                    author_id: action.author_id,
                }]),
        }

    case giveTimeActions.GAVE_TIME:
        return { ...state,
            projects: state.projects.map(
                project => project.id === action.id
                    ? { ...project, acquired: action.acquired }
                    : project
            ),
        }

    case addProjectActions.PROJECT_CREATED:
        return { ...state,
            projects: state.projects.concat([{
                id: action.id,
                title: action.title,
                estimate: action.estimate,
                acquired: action.acquired,
                description: action.description,
                author: action.author,
                author_id: action.author_id,
            }]),
        }

    case viewProjectActions.PROJECT_EDITED:
        return { ...state,
            projects: state.projects.map(
                project => project.id === action.id
                    ? { ...project,
                        title: action.title || project.title,
                        estimate: parseFloat(action.estimate) || project.estimate,
                        description: action.description || project.description,
                    }
                    : project
            ),
        }

    case projectRowActions.PROJECT_DELETED:
        return { ...state,
            projects: state.projects.filter(project => project.id !== action.id),
        }

    default:
        return state

    }
}
