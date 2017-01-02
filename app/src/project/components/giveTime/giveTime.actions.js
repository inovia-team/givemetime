import { getGraphQL } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ userToken, amount, projectRowId }) {
    return dispatch => {
        dispatch(getGraphQL(userToken, `
            mutation giveTime(
                $projectRowId: Int!,
                $credit: Int!
            ){
                projectGiveTime(input: {
                    projectId: $projectRowId,
                    amount: $credit
                }) {
                    output {
                        rowId,
                        acquired
                    }
                }
            }`,
            {
                credit: amount,
                projectRowId: projectRowId,
            },
            () => {
                dispatch(gaveTime(amount, projectRowId))
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
