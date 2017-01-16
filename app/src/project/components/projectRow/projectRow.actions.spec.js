import expect from 'expect'
import thunk from 'redux-thunk'
import * as actions from './projectRow.actions'
import * as constants from './projectRow.actionTypes'
import * as config from '../../../config'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
let unsubscribe

describe('Delete actions', () => {

    afterEach(() => {
        unsubscribe()
    })

    it('should handle delete', done => {
        var store = mockStore({})
        const expected = {
            type: constants.PROJECT_DELETED,
            id: 42,
        }

        nock(config.API_URL)
        .delete(`/project/${expected.id}`)
        .reply(200, { id: expected.id })

        store.dispatch(actions.deleteProject({ userToken: null, id: expected.id }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })

    it('should handle delete error', done => {
        var store = mockStore({})
        const expected = { message: 'Error delete', type: 'APOLOGIZE' }
        const id = 42

        nock(config.API_URL)
        .delete(`/project/${id}`)
        .reply(500, { error: { status: 500, message: expected.message } })

        store.dispatch(actions.deleteProject({ userToken: null, id: id }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })
})
