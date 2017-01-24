import { RequestService } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ userToken, amount, projectId }) {
    return dispatch => {
        dispatch(RequestService('POST', userToken, { amount }, `project/give/${projectId}`,
            ({ response }) => {
                dispatch(gaveTime(response.acquired, amount, response.id))
            }
        ))
    }
}

export const gaveTime = (acquired, amount, projectId) => {
    return {
        type: constants.GAVE_TIME,
        acquired: parseFloat(acquired),
        amount: amount,
        id: projectId,
    }
}
