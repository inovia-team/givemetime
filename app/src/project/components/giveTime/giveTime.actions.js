import { PostRequest } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ userToken, amount, projectId }) {
    return dispatch => {
        dispatch(PostRequest(userToken, { amount }, `project/give/${projectId}`,
            () => {
                dispatch(gaveTime(amount, projectId))
            }
        ))
    }
}

export const gaveTime = (amount, projectId) => {
    return {
        type: constants.GAVE_TIME,
        amount: amount,
        id: projectId,
    }
}
