import { PostRequest } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ userToken, userId, amount, projectId }) {
    return dispatch => {
        dispatch(PostRequest(userToken, { userId, amount }, `project/give/${projectId}`,
            ({ response }) => {
                dispatch(gaveTime(response.acquired, amount, response.id))
            }
        ))
    }
}

export const gaveTime = (acquired, amount, projectId) => {
    return {
        type: constants.GAVE_TIME,
        acquired: acquired,
        amount: amount,
        id: projectId,
    }
}
