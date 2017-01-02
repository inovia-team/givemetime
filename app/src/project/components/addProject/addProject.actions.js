import { PostRequest } from '../../../common/common.actions'
import * as constants from './addProject.actionTypes'

export function createProject ({ userToken, userId, title, estimate, description }) {
    return dispatch => {
        dispatch(PostRequest(userToken, { userId, title, estimate, description }, 'project',
            response => {
                dispatch(projectCreated(
                    response.id,
                    response.title,
                    response.estimate,
                    response.acquired,
                    response.description,
                    response.id // TODO: relation fullname -> ID. API side
                ))
            }
        ))
    }
}

export const projectCreated = (id, title, estimate, acquired, description) => {
    return {
        type: constants.PROJECT_CREATED,
        id: id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
    }
}
