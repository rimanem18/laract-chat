import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const groupsSelector = (state: RootState) => state.groupsSlice

export const selectGroups = {
  allIds: createSelector(groupsSelector, (groupsSlice) => {
    return groupsSlice.groups.allIds
  }),
  byId: createSelector(groupsSelector, (groupsSlice) => {
    return groupsSlice.groups.byId
  }),
}

export const selectRoles = {
  allIds: createSelector(groupsSelector, (groupsSlice) => {
    return groupsSlice.roles.allIds
  }),
  byId: createSelector(groupsSelector, (groupsSlice) => {
    return groupsSlice.roles.byId
  }),
}

/**
 * promise を取得する
 */
export const groupsPromiseSelector = createSelector(
  groupsSelector,
  (groupsSlice) => {
    return groupsSlice.promise
  }
)

/**
 * oldestId を取得する
 */
export const groupsOldestIdselector = createSelector(
  groupsSelector,
  (groupsSlice) => {
    return groupsSlice.oldestId
  }
)
