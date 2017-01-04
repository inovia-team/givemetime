import reducer from './common.reducers'
import * as constants from './common.actionTypes'
import expect from 'expect'

describe('Apology reducer', () => {
    it('should handle APOLOGIZE', () => {
        expect(
            reducer({ }, {
                type: constants.APOLOGIZE,
                message: 'Please don\'t be mad',
            })
        ).toEqual({ apology: 'Please don\'t be mad' })
    })
    it('should handle CLOSE_MODAL', () => {
        expect(
            reducer({ apology: 'Please don\'t be mad' }, {
                type: constants.CLOSE_MODAL,
            })
        ).toEqual({ apology: null })
    })
})
