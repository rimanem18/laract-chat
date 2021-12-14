import { PayloadAction } from '@reduxjs/toolkit'
import { GroupsPayload, RoleGroupPayload, RolesPayload } from '../../app/type'
import {
  addGroup,
  editGroup,
  deleteGroup,
  fetchGroups,
  groupsSlice,
  GroupsState,
} from '../../slices/GroupsSlice'

// 初期値
const initialState: GroupsState = {
  groups: {
    byId: {},
    allIds: [],
  },
  roleGroup: {
    byId: {},
    allIds: [],
  },
  oldestId: 1,
  promise: 'idle',
}

const payloadMock: {
  groups: GroupsPayload
  roleGroup: RoleGroupPayload
} = {
  groups: {
    public_groups: [
      {
        id: 1,
        name: 'hello group',
      },
      {
        id: 2,
        name: 'hoge group',
      },
    ],
    private_groups: [
      {
        id: 3,
        name: 'private group',
      },
      {
        id: 4,
        name: 'fuga group',
      },
    ],
  },
  roleGroup: {
    role_group: [
      {
        group_id: 3,
        role_id: 1,
      },
      {
        group_id: 4,
        role_id: 2,
      },
    ],
  },
}

describe('ChatMessages', () => {
  describe('fetchGroups', () => {
    it('fetch pending', () => {
      const action = {
        type: fetchGroups.pending.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('fetchGroups fulfilled', () => {
      const action: PayloadAction<{
        groups: GroupsPayload
        roleGroup: RoleGroupPayload
      }> = {
        type: fetchGroups.fulfilled.type,
        payload: payloadMock,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.groups.byId).toEqual({
        group1: {
          id: 1,
          name: 'hello group',
          roles: [],
        },
        group2: {
          id: 2,
          name: 'hoge group',
          roles: [],
        },
        group3: {
          id: 3,
          name: 'private group',
          roles: ['role1'],
        },
        group4: {
          id: 4,
          name: 'fuga group',
          roles: ['role2'],
        },
      })
      expect(state.groups.allIds).toEqual([
        'group1',
        'group2',
        'group3',
        'group4',
      ])
      expect(state.oldestId).toBe(1)
      expect(state.promise).toBe('idle')
    })
    it('fetchGroups rejected', () => {
      const action = {
        type: fetchGroups.rejected.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })

  describe('addGroup', () => {
    it('addGroup pending', () => {
      const action = {
        type: addGroup.pending.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('addGroup fulfilled', () => {
      const action: PayloadAction<{
        groups: GroupsPayload
        roleGroup: RoleGroupPayload
      }> = {
        type: addGroup.fulfilled.type,
        payload: payloadMock,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('addGroup rejected', () => {
      const action = {
        type: addGroup.rejected.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })

  describe('editGroup', () => {
    it('editGroup pending', () => {
      const action = {
        type: editGroup.pending.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('editGroup fulfilled', () => {
      const action: PayloadAction<{
        groups: GroupsPayload
        roleGroup: RoleGroupPayload
      }> = {
        type: editGroup.fulfilled.type,
        payload: payloadMock,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('editGroup rejected', () => {
      const action = {
        type: editGroup.rejected.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })

  describe('deleteGroup', () => {
    it('deleteGroup pending', () => {
      const action = {
        type: deleteGroup.pending.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('deleteGroup fulfilled', () => {
      const action: PayloadAction<{
        groups: GroupsPayload
        roleGroup: RoleGroupPayload
      }> = {
        type: deleteGroup.fulfilled.type,
        payload: payloadMock,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('deleteGroup rejected', () => {
      const action = {
        type: deleteGroup.rejected.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })
})
