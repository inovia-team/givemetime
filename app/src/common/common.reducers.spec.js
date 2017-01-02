import reducer from './common.reducers'
import * as actions from './common.actions'
import expect from 'expect'

describe('Apology reducer', () => {
    it('should handle APOLOGIZE', () => {
        expect(
            reducer({ }, actions.apologize('Please don\'t be mad'))
        ).toEqual({ apology: 'Please don\'t be mad' })
    })
})
