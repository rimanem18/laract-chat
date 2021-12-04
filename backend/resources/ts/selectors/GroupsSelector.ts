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
  allNumberIds: createSelector(groupsSelector, (groupsSlice) => {
    let groupIds: number[] = []
    const groups = groupsSlice.groups
    groups.allIds.forEach((groupId) => {
      groupIds.push(groups.byId[groupId].id)
    })
    return groupIds
  }),
}

export const selectRoleGroup = {
  allIds: createSelector(groupsSelector, (groupsSlice) => {
    return groupsSlice.roleGroup.allIds
  }),
  byId: createSelector(groupsSelector, (groupsSlice) => {
    return groupsSlice.roleGroup.byId
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
export const groupsOldestIdSelector = createSelector(
  groupsSelector,
  (groupsSlice) => {
    return groupsSlice.oldestId
  }
)

/**
 * もっとも古いグループのパス
 */
export const groupsDefaultPathSelector = createSelector(
  groupsSelector,
  (groupsSlice) => {
    const path = `/groups/${groupsSlice.oldestId.toString()}`
    return path
  }
)
