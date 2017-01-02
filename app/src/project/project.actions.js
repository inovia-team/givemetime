import { GetRequest } from '../common/common.actions.js'
import * as constants from './project.actionTypes'

const graphQLDispatchNodeFetched = dispatch => node => {
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
            ({ response }) => {
                response.map(graphQLDispatchNodeFetched(dispatch))
            }
        ))
    }
}

export function loadProject (id) {
    return () => dispatch => {
        dispatch(GetRequest(null, `project/${id}`,
            ({ response }) => graphQLDispatchNodeFetched(dispatch)(response)
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
