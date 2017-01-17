import { RequestService } from '../../../common/common.actions'
import * as constants from './projectRow.actionTypes'

export function deleteProject ({ userToken, id }) {
    return dispatch => {
        dispatch(RequestService('DELETE', userToken, null, `project/${id}`,
            ({ response }) => dispatch(projectDeleted(response.id || '0', response.newCredits))
        ))
    }
}

export const projectDeleted = (id, newCredits) => {
    return {
        type: constants.PROJECT_DELETED,
        id: id,
        newCredits: newCredits,
    }
}
