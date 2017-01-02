import expect from 'expect'

import thunk from 'redux-thunk'

import * as actions from './layout.actions.js'

import * as constants from './layout.actionTypes.js'

import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Layout actions', () => {
    it('should create a global menu toggle action', () => {

        var store = mockStore({})
        const expected = { type: constants.GLOBAL_MENU_TOGGLE, open: false }
        store.dispatch(actions.globalMenuToggle(true))
        expect(store.getActions()[0]).toEqual(expected)

        store.dispatch(actions.globalMenuToggle(false))
        expect(store.getActions()[1]).toEqual({
            type: constants.GLOBAL_MENU_TOGGLE,
            open: true })
    })
})