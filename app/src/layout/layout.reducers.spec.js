import reducer from './layout.reducers.js'
import expect from 'expect'

describe('Layout reducer', () => {
    it('should handle GLOBAL_MENU_TOGGLE', () => {
        expect(
            reducer({ globalMenuOpen: true }, {
                type: 'GLOBAL_MENU_TOGGLE',
                open: false,
            })
        ).toEqual({ globalMenuOpen: false })

        expect(
            reducer({ globalMenuOpen: false }, {
                type: 'GLOBAL_MENU_TOGGLE',
                open: true,
            })
        ).toEqual({ globalMenuOpen: true })
    })
})
