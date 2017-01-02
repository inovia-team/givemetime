import { GetRequest, getGraphQL } from '../common/common.actions.js'
import * as constants from './project.actionTypes'

const graphQLNodeFields = `
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
`
const graphQLDispatchNodeFetched = dispatch => node => {
  console.log(node)
   dispatch(projectFetched(
    node.id,
    node.title,
    node.estimate,
    node.acquired,
    node.description,
    node.personByAuthorId ? node.personByAuthorId.fullname : null
  ))
}

export function loadProjects () {
    return dispatch => {
        dispatch(GetRequest(null, 'projects',
            ({response}) => {
              console.log(response)
              response
                .map(graphQLDispatchNodeFetched(dispatch))
            }
        ))
    }
}

export function loadProject (id) {
    return () => dispatch => {
        dispatch(getGraphQL(null, `
             query project($id: ID!) {
                viewer {
                  project(id: $id) {
                    ${graphQLNodeFields}
                  }
                }
            }`,
            { id: id },
            response => graphQLDispatchNodeFetched(dispatch)(response.viewer.project)
        ))
    }
}

export const projectFetched = (id, title, estimate, acquired, description, author) => {
    return {
        type: constants.PROJECT_FETCHED,
        id: id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
        author: author,
    }
}
