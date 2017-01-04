import { RequestService } from '../../../common/common.actions'
import * as constants from './projectRow.actionTypes'

export function deleteProject ({ userToken, id }) {
    return dispatch => {
        dispatch(RequestService('DELETE', userToken, null, `project/${id}`,
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
