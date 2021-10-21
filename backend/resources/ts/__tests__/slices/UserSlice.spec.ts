import { fetchUser, userSlice, UserState } from '../../slices/UserSlice'

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  promise: 'idle',
}

describe('userSlice', () => {
  describe('extraReducer', () => {
    it('fetchUser pending', () => {
      const action = {
        type: fetchUser.pending.type,
      }
      const state = userSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('fetchUser fulfilled', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: {
          id: 0,
          name: '',
          email: '',
          promise: 'idle',
        },
      }
      const state = userSlice.reducer(initialState, action)
      expect(state.id).toBe(0)
      expect(state.name).toBe('')
      expect(state.email).toBe('')
      expect(state.promise).toBe('idle')
    })
    it('fetchUser rejected', () => {
      const action = {
        type: fetchUser.rejected.type,
      }
      const state = userSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })
})
