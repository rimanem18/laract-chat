import { fetchUser, userSlice, UserState } from '../../slices/UserSlice'

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  promise: 'idle',
  role: {
    ids: ['role0'],
    entities: {
      role1: {
        id: 0,
        name: '',
      },
    },
  },
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
          role: {
            ids: ['role0'],
            entities: {
              role1: {
                id: 0,
                name: '',
              },
            },
          },
        },
      }
      const state = userSlice.reducer(initialState, action)
      expect(state.id).toBe(0)
      expect(state.name).toBe('')
      expect(state.email).toBe('')
      expect(state.promise).toBe('idle')
      expect(state.role.ids).toEqual(['role0'])
      expect(state.role.entities).toEqual({
        role1: {
          id: 0,
          name: '',
        },
      })
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
