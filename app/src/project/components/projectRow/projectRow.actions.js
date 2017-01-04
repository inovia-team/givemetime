import { DelRequest } from '../../../common/common.actions'
import * as constants from './projectRow.actionTypes'

export function deleteProject ({ userToken, id, userId }) {
    return dispatch => {
        dispatch(DelRequest(userToken, userId, `project/${id}`,
            ({ response }) => dispatch(projectDeleted(response.id || '0'))
        ))
    }
}

export const projectDeleted = id => {
    return {
        type: constants.PROJECT_DELETED,
        id: id,
    }
}
