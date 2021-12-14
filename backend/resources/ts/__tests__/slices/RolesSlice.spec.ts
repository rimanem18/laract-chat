import { PayloadAction } from '@reduxjs/toolkit'
import { RolesPayload } from '../../app/type'
import { fetchRoles, rolesSlice, RolesState } from '../../slices/RolesSlice'

// 初期値
const initialState: RolesState = {
  roles: {
    byId: {},
    allIds: [],
  },
  promise: 'idle',
}

const payloadMock: {
  roles: RolesPayload
} = {
  roles: {
    roles: [
      { id: 1, name: '特権管理者', color: '#c8336f' },
      { id: 2, name: '管理者', color: '#e45c0b' },
      {
        id: 3,
        name: 'スタッフ',
        color: '#169824',
      },
    ],
  },
}

describe('Roles', () => {
  describe('fetchRoles', () => {
    it('fetchRoles pending', () => {
      const action = {
        type: fetchRoles.pending.type,
      }
      const state = rolesSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('fetchRoles fulfilled', () => {
      const action: PayloadAction<{
        roles: RolesPayload
      }> = {
        type: fetchRoles.fulfilled.type,
        payload: payloadMock,
      }
      const state = rolesSlice.reducer(initialState, action)
      expect(state.roles.allIds).toEqual(['role1', 'role2', 'role3'])
      expect(state.roles.byId).toEqual({
        role1: { id: 1, name: '特権管理者', color: '#c8336f' },
        role2: { id: 2, name: '管理者', color: '#e45c0b' },
        role3: {
          id: 3,
          name: 'スタッフ',
          color: '#169824',
        },
      })
      expect(state.promise).toBe('idle')
    })
    it('fetchRoles rejected', () => {
      const action = {
        type: fetchRoles.rejected.type,
      }
      const state = rolesSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })
})
