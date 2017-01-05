import expect from 'expect'
import thunk from 'redux-thunk'
import * as actions from './giveTime.actions'
import * as constants from './giveTime.actionTypes'
import * as config from '../../../config'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
let unsubscribe

describe('giveTime actions', () => {

    afterEach(() => {
        unsubscribe()
    })

    it('should handle give time', done => {
        var store = mockStore({})
        const expected = {
            type: constants.GAVE_TIME,
            id: 42,
            acquired: 5,
            amount: 3,
        }

        nock(config.API_URL)
        .post(`/project/give/${expected.id}`)
        .reply(200, { acquired: expected.acquired, id: expected.id })

        store.dispatch(actions.giveTime({ userToken: null, amount: expected.amount, projectId: expected.id }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })

    it('should handle give time error', done => {
        var store = mockStore({})
        const expected = { message: 'Error give time', type: 'APOLOGIZE' }

        nock(config.API_URL)
        .post(`/project/give/${expected.id}`)
        .reply(500, { error: { status: 500, message: expected.message } })

        store.dispatch(actions.giveTime({ userToken: null, amount: -42, projectId: expected.id }))
        unsubscribe = store.subscribe(function () {
            expect(store.getActions()[0]).toEqual(expected)
            done()
        })
    })
})
