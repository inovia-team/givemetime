import expect from 'expect'
import thunk from 'redux-thunk'
import * as actions from './project.actions'
import * as constants from './project.actionTypes'
import * as config from '../config'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
let unsubscribe

describe('loadProject actions', () => {

    afterEach(() => {
        unsubscribe()
    })

    it('should handle loadProjects', done => {
        var store = mockStore({})
        const expected = {
            type: constants.PROJECT_FETCHED,
            id: 42,
            estimate: 42,
            acquired: 0,
            description: 'description',
            title: 'title',
            author: null, // TODO: Fix author when OAuth is working
        }

        nock(config.API_URL)
        .get('/projects')
        .reply(200, [{ id: expected.id, estimate: expected.estimate, acquired: expected.acquired,
            description: expected.description, title: expected.title, author: expected.author }])

        store.dispatch(actions.loadProjects())
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })

    it('should handle loadProjects error', done => {
        var store = mockStore({})
        const expected = { message: 'loadProjects error', type: 'APOLOGIZE' }

        nock(config.API_URL)
        .get('/projects')
        .reply(500, { error: { status: 500, message: expected.message } })

        store.dispatch(actions.loadProjects())
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })

    it('should handle loadProject', done => {
        var store = mockStore({})
        const expected = {
            type: constants.PROJECT_FETCHED,
            id: 42,
            estimate: 42,
            acquired: 0,
            description: 'description',
            title: 'title',
            author: null, // TODO: Fix author when OAuth is working
        }

        nock(config.API_URL)
        .get(`/project/${expected.id}`)
        .reply(200, { id: expected.id, estimate: expected.estimate, acquired: expected.acquired,
            description: expected.description, title: expected.title, author: expected.author })

        store.dispatch(actions.loadProject(expected.id))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })

    it('should handle loadProject error', done => {
        var store = mockStore({})
        const expected = { message: 'loadProject error', type: 'APOLOGIZE' }
        const id = 42

        nock(config.API_URL)
        .get(`/project/${id}`)
        .reply(500, { error: { status: 500, message: expected.message } })

        store.dispatch(actions.loadProject(id))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })
})
