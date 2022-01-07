import { PayloadAction } from '@reduxjs/toolkit'
import { RoleUserPayload, UserState } from '../../app/type'
import { fetchUser, userSlice } from '../../slices/UserSlice'

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  roles: [],
  promise: 'idle',
}

const payloadMock: {
  user: UserState
  roleUser: RoleUserPayload[]
} = {
  user: {
    id: 1,
    name: '太郎',
    email: 'taro@example.com',
    roles: ['role1'],
    promise: 'idle',
  },
  roleUser: [
    {
      user_id: 1,
      role_id: 1,
    },
  ],
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
      const action: PayloadAction<{
        user: UserState
        roleUser: RoleUserPayload[]
      }> = {
        type: fetchUser.fulfilled.type,
        payload: payloadMock,
      }
      const state = userSlice.reducer(initialState, action)
      expect(state.id).toBe(1)
      expect(state.name).toBe('太郎')
      expect(state.email).toBe('taro@example.com')
      expect(state.promise).toBe('idle')
      expect(state.roles).toEqual(['role1'])
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
