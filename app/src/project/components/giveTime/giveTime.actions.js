import { PostRequest } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ userToken, userId, amount, projectId }) {
    return dispatch => {
        dispatch(PostRequest(userToken, { userId, amount }, `project/give/${projectId}`,
            ({ response }) => {
                dispatch(gaveTime(parseInt(response.acquired), response.id))
            }
        ))
    }
}

export const gaveTime = (acquired, projectId) => {
    return {
        type: constants.GAVE_TIME,
        acquired: acquired,
        id: projectId,
    }
}
