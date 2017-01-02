import { getGraphQL } from '../../../common/common.actions'
import * as constants from './addProject.actionTypes'

export function createProject ({ userToken, title, estimate, description }) {
    return dispatch => {
        dispatch(getGraphQL(userToken, `
            mutation projectCreate(
              $title: String!,
              $estimate: Int!,
              $description: String
            ){
              projectCreate(input: {
                  title: $title,
                  estimate: $estimate,
                  description: $description
              }) {
                   output {
                      id,
                      rowId,
                      title,
                      estimate,
                      acquired,
                      description,
                      personByAuthorId {
                          id,
                          fullname,
                          credit
                      }
                  }
              }
            }`,
            {
                title,
                estimate,
                description,
            },
            response => {
                dispatch(projectCreated(
                    response.projectCreate.output.id,
                    response.projectCreate.output.rowId,
                    response.projectCreate.output.title,
                    response.projectCreate.output.estimate,
                    response.projectCreate.output.acquired,
                    response.projectCreate.output.description,
                    response.projectCreate.output.personByAuthorId.fullname
                ))
            }
        ))
    }
}

export const projectCreated = (id, row_id, title, estimate, acquired, description) => {
    return {
        type: constants.PROJECT_CREATED,
        id: id,
        rowId: row_id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
    }
}
