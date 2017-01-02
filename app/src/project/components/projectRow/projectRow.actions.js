import { DelRequest } from '../../../common/common.actions'
import * as constants from './projectRow.actionTypes'

export function deleteProject ({ userToken, id }) {
    return dispatch => {

        dispatch(DelRequest(userToken, `project/${id}`,
            response => dispatch(projectDeleted(parseInt(response.output || '0')))
        ))
    }
}

export const projectDeleted = rowId => {
    return {
        type: constants.PROJECT_DELETED,
        rowId: rowId,
    }
}
