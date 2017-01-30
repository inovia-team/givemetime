import { RequestService } from '../../../common/common.actions.js'
import * as constants from './viewProject.actionTypes'

export function editProject ({ userToken, projectId, title, estimate, description }) {
    return dispatch => {
        dispatch(RequestService('PUT', userToken, { title, estimate, description }, `project/${projectId}`,
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
