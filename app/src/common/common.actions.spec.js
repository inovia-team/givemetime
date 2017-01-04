import expect from 'expect'
import thunk from 'redux-thunk'
import nock from 'nock'
import sinon from 'sinon'
import * as config from '../config'
import * as actions from './common.actions'
import * as constants from './common.actionTypes'

import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Common actions', () => {
    let store, onSuccess, onError

    beforeEach(() => {
        store = mockStore({})
        onSuccess = sinon.stub()
        onError = sinon.stub()
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it('should call any API endpoint and call the success function', done => {
        nock(config.API_URL, {
            reqheaders: {
                'content-type': 'application/json',
            },
        })
            .post('/project')
            .reply(200, { todos: ['do something'] })

        store.dispatch(actions.RequestService(
            'POST', null, { params : {} }, 'project', onSuccess, onError
        )).then(() => {
            expect(onSuccess.calledOnce).toEqual(true)
            expect(onSuccess.calledWith({ response: { todos: ['do something'] } })).toEqual(true)
            expect(onError.calledOnce).toEqual(false)
            done()
        }).catch(done)
    })

    it('should call the error function on server error', done => {
        nock(config.API_URL)
            .post('/project')
            .reply(500, { error: { status: 500, message: 'OMG nope!' } })

        store.dispatch(actions.RequestService(
            'POST', null, { params : {} }, 'project', onSuccess, onError
        )).then(() => {
            expect(onSuccess.calledOnce).toEqual(false)
            expect(onError.calledOnce).toEqual(true)
            expect(onError.calledWith('OMG nope!')).toEqual(true)
            done()
        }).catch(done)
    })

    it('should call the error function on fetch error', done => {
        nock(config.API_URL)
            .post('/project')
            .replyWithError('Fetch error! :(')

        store.dispatch(actions.RequestService(
            'POST', null, { params : {} }, 'project', onSuccess, onError
        )).then(() => {
            expect(onSuccess.calledOnce).toEqual(false)
            expect(onError.calledOnce).toEqual(true)
            // need to perform a 'match' since fetch is addind his own message
            expect(onError.calledWith(sinon.match('Fetch error! :('))).toEqual(true)
            done()
        }).catch(done)
    })
    it('should handle close modal action', () => {
        var store = mockStore({})
        const expected = { type: constants.CLOSE_MODAL }
        store.dispatch(actions.closeModal())
        expect(store.getActions()[0]).toEqual(expected)
    })
})
