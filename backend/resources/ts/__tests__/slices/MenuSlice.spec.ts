import { MenuState } from '../../app/type'
import { menuSlice, toggleMenuOpen } from '../../slices/MenuSlice'

const initialState: MenuState = {
  isOpen: false,
}

describe('menuSlice', () => {
  describe('reducer', () => {
    it('toggleMenuOpen false', () => {
      const action = {
        type: toggleMenuOpen.type,
        payload: false,
      }
      const state = menuSlice.reducer(initialState, action)
      expect(state.isOpen).toBe(false)
    })
  })

  it('toggleMenuOpen true', () => {
    const action = {
      type: toggleMenuOpen.type,
      payload: true,
    }
    const state = menuSlice.reducer(initialState, action)
    expect(state.isOpen).toBe(true)
  })
})
