import { getGraphQL } from '../../../common/common.actions'
import * as constants from './projectRow.actionTypes'

export function deleteProject ({ userToken, rowId }) {
    return dispatch => {
        dispatch(getGraphQL(userToken, `
            mutation projectDelete(
                $rowId: Int!
            ) {
                projectDelete(input: {
                    id: $rowId
                }) {
                    output
                }
            }`,
            { rowId },
            response => dispatch(projectDeleted(parseInt(response.projectDelete.output || '0')))
        ))
    }
}

export const projectDeleted = rowId => {
    return {
        type: constants.PROJECT_DELETED,
        rowId: rowId,
    }
}