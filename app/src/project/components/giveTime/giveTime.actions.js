import { PostRequest } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ userToken, userId, amount, projectId }) {
    return dispatch => {
        dispatch(PostRequest(userToken, { userId, amount }, `project/give/${projectId}`,
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
