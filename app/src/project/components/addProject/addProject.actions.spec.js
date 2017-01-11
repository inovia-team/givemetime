import expect from 'expect'
import thunk from 'redux-thunk'
import * as actions from './addProject.actions'
import * as constants from './addProject.actionTypes'
import * as config from '../../../config'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
let unsubscribe

describe('addProject actions', () => {

    afterEach(() => {
        unsubscribe()
    })

    it('should handle create project', done => {
        var store = mockStore({})
        const expected = {
            type: constants.PROJECT_CREATED,
            id: 1,
            estimate: 42,
            acquired: 0,
            author: null,
            author_id: null,
            description: 'Inovia rocks!',
            title: 'My test project',
        }

        nock(config.API_URL)
        .post('/project')
        .reply(200, { id: expected.id, title: expected.title, estimate: expected.estimate, description: expected.description, acquired: expected.acquired, author: expected.author, author_id: expected.author_id })

        store.dispatch(actions.createProject({ userToken: null, id: expected.id, title: expected.title, estimate: expected.estimate, description: expected.description }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })

    it('should handle create project error', done => {
        var store = mockStore({})
        const expected = { message: 'Error create project', type: 'APOLOGIZE' }

        nock(config.API_URL)
        .post('/project')
        .reply(500, { error: { status: 500, message: expected.message } })

        store.dispatch(actions.createProject({ userToken: null, id: 42 }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })
})
