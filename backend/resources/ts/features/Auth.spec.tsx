import { authSlice, AuthState, login, logout, register } from './AuthSlice'
import { RootState } from '../app/store'

const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  promise: 'idle',
}

describe('authSlice', () => {
  describe('register', () => {
    it('register pending', () => {
      const action = {
        type: register.pending.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("loading")
    })
    it('register fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("idle")
    })
    it('register rejected', () => {
      const action = {
        type: register.rejected.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("rejected")
    })
  })

  describe('login', () => {
    it('login pending', () => {
      const action = {
        type: login.pending.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("loading")
    })
    it('login fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("idle")
    })
    it('login rejected', () => {
      const action = {
        type: login.rejected.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("rejected")
    })
  })

  describe('logout', () => {
    it('logout pending', () => {
      const action = {
        type: logout.pending.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("loading")
    })
    it('logout fulfilled', () => {
      const action = {
        type: logout.fulfilled.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("idle")
    })
    it('logout rejected', () => {
      const action = {
        type: logout.rejected.type,
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.promise).toEqual("rejected")
    })
  })
})

