import expect from 'expect'
import thunk from 'redux-thunk'
import * as actions from './viewProject.actions'
import * as constants from './viewProject.actionTypes'
import * as config from '../../../config'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
let unsubscribe

describe('editProject actions', () => {

    afterEach(() => {
        unsubscribe()
    })

    it('should handle editProject', done => {
        var store = mockStore({})
        const expected = {
            type: constants.PROJECT_EDITED,
            id: 42,
            estimate: 42,
            description: 'description',
            title: 'title',
        }

        nock(config.API_URL)
        .put(`/project/${expected.id}`)
        .reply(200, { id: expected.id, estimate: expected.estimate,
            description: expected.description, title: expected.title })

        store.dispatch(actions.editProject({ userToken: null, projectId: expected.id, estimate: expected.estimate,
            description: expected.description, title: expected.title }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })

    it('should handle editProject error', done => {
        var store = mockStore({})
        const expected = { message: 'editProject error', type: 'APOLOGIZE' }
        const projectId = 42

        nock(config.API_URL)
        .put(`/project/${projectId}`)
        .reply(500, { error: { status: 500, message: expected.message } })

        store.dispatch(actions.editProject({ projectId: projectId }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })
})
