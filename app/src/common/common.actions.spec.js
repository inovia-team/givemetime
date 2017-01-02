import expect from 'expect'
import thunk from 'redux-thunk'
import nock from 'nock'
import sinon from 'sinon'
import * as config from '../config'
import * as actions from './common.actions'

import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('GraphQL actions', () => {
    let store, onSuccess, onError

    beforeEach(() => {
        store = mockStore({})
        onSuccess = sinon.stub()
        onError = sinon.stub()
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it('should call the graphql endpoint and call the success function', done => {
        nock(config.API_URL, {
            reqheaders: {
                'content-type': 'application/json',
            },
        })
            .post('/graphql')
            .reply(200, { data: { todos: ['do something'] } })

        store.dispatch(actions.getGraphQL(
            null, 'query { ... }', { params : {} }, onSuccess, onError
        )).then(() => {
            expect(onSuccess.calledOnce).toEqual(true)
            expect(onSuccess.calledWith({ todos: ['do something'] })).toEqual(true)
            expect(onError.calledOnce).toEqual(false)
            done()
        }).catch(done)
    })

    it('should call the error function on server error', done => {
        nock(config.API_URL)
            .post('/graphql')
            .replyWithError('OMG nope!')

        store.dispatch(actions.getGraphQL(
            null, 'query { ... }', { params : {} }, onSuccess, onError
        )).then(() => {
            expect(onSuccess.calledOnce).toEqual(false)
            expect(onError.calledOnce).toEqual(true)
            // @todo: I could not make it call the handler with the exact response body...
            expect(onError.calledWithMatch(/OMG nope!/)).toEqual(true)
            done()
        }).catch(done)
    })

})