import * as projectActions from './project.actionTypes'
import * as giveTimeActions from './components/giveTime/giveTime.actionTypes'
import * as projectRowActions from './components/projectRow/projectRow.actionTypes'

export default function (state = { projects: [] }, action) {
    switch (action.type) {

    case projectActions.PROJECT_FETCHED:
        return { ...state,
            projects: state.projects
                .filter(project => project.id !== action.id)
                .concat([{
                    id: action.id,
                    rowId: action.rowId,
                    name: action.name,
                    time: action.time,
                    title: action.title,
                    estimate: action.estimate,
                    acquired: action.acquired,
                    description: action.description,
                    author: action.author,
                }]),
        }

    case giveTimeActions.GAVE_TIME:
        return { ...state,
            projects: state.projects.map(
                project => project.id === action.id
                    ? { ...project, acquired: project.acquired + action.amount }
                    : project
            ),
        }

    case projectRowActions.PROJECT_DELETED:
        return { ...state,
            projects: state.projects.filter(project => project.rowId !== action.rowId),
        }

    default:
        return state

    }
}