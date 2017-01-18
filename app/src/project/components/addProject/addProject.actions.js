import { RequestService } from '../../../common/common.actions'
import * as constants from './addProject.actionTypes'

export function createProject ({ userToken, userId, title, estimate, description }) {
    return dispatch => {
        dispatch(RequestService('POST', userToken, { userId, title, estimate, description }, 'project',
            ({ response }) => {
                dispatch(projectCreated(
                    response.id,
                    response.title,
                    response.estimate,
                    response.acquired,
                    response.description,
                    response.author || null,
                    response.author_id || null
                ))
            }
        ))
    }
}

export function editProject ({ userToken, userId, projectId, title, estimate, description }) {
    return dispatch => {
        dispatch(RequestService('PUT', userToken, { userId, title, estimate, description }, `project/${projectId}`,
            ({ response }) => {
                dispatch(projectEdited(
                    response.id,
                    response.title,
                    response.estimate,
                    response.description
                ))
            }
        ))
    }
}

export const projectEdited = (id, title, estimate, description) => {
    return {
        type: constants.PROJECT_EDITED,
        id: id,
        estimate: estimate,
        description: description,
        title: title,
    }
}

export const projectCreated = (id, title, estimate, acquired, description, author, author_id) => {
    return {
        type: constants.PROJECT_CREATED,
        id: id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
        author: author,
        author_id: author_id,
    }
}
