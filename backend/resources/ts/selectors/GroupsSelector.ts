import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const groupsSelector = (state: RootState) => state.groupsSlice

/**
 * ids を取得する
 */
export const groupIdsSelector = createSelector(
  groupsSelector,
  (groupsSlice) => {
    return groupsSlice.ids
  }
)

/**
 * entities を取得する
 */
export const groupsEntitiesSelector = createSelector(
  groupsSelector,
  (groupsSlice) => {
    return groupsSlice.entities
  }
)

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
