import { authSlice, AuthState, login, logout, register } from './AuthSlice'

const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  promise: 'idle',
  message: '',
}

describe('authSlice', () => {
  describe('register', () => {
    it('register pending', () => {
      const action = {
        type: register.pending.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('register fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('register rejected', () => {
      const action = {
        type: register.rejected.type,
        payload: {
          response: {
            data: {
              message: 'すでに登録済みのメールアドレスです。',
            },
          },
        },
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
      expect(state.message).toBe(action.payload.response.data.message)
    })
  })

  describe('login', () => {
    it('login pending', () => {
      const action = {
        type: login.pending.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('login fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('login rejected', () => {
      const action = {
        type: login.rejected.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })

  describe('logout', () => {
    it('logout pending', () => {
      const action = {
        type: logout.pending.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('logout fulfilled', () => {
      const action = {
        type: logout.fulfilled.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('logout rejected', () => {
      const action = {
        type: logout.rejected.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })
})
