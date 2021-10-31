import { PayloadAction } from '@reduxjs/toolkit'
import {
  addGroup,
  fetchGroups,
  Group,
  groupsSlice,
  GroupsState,
  updateGroups,
} from '../../slices/GroupsSlice'

// 初期値
const initialState: GroupsState = {
  ids: [],
  entities: {
    group0: {
      id: 0,
      name: '',
    },
  },
  promise: 'idle',
  oldestId: 1,
}

const payloadMock = [{ id: 1, name: 'hoge' }]

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
      const action: PayloadAction<Group[]> = {
        type: fetchGroups.fulfilled.type,
        payload: payloadMock,
      }
      const state = groupsSlice.reducer(initialState, action)
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

  describe('updateGroups', () => {
    it('updateGroups pending', () => {
      const action = {
        type: updateGroups.pending.type,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('updateGroups fulfilled', () => {
      const action: PayloadAction<Group[]> = {
        type: updateGroups.fulfilled.type,
        payload: payloadMock,
      }
      const state = groupsSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('updateGroups rejected', () => {
      const action = {
        type: updateGroups.rejected.type,
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
      const action: PayloadAction<Group[]> = {
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
})
