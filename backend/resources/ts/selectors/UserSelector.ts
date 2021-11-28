import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'
import { userSlice } from '../slices/UserSlice'

export const userSelector = (state: RootState) => state.userSlice

/**
 * userId を取得する
 */
export const userIdSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.id
})

/**
 * userName を取得する
 */
export const userNameSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.name
})

/**
 * userEmail を取得する
 */
export const userEmailSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.email
})

/**
 * userRoleIds を取得する
 */
export const userRoleIdsSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.role.ids
})

/**
 * userRoleIds 数値でを取得する
 */
export const userRoleNumberIdsSelector = createSelector(
  userSelector,
  (userSlice) => {
    // 数値の ID 一覧に変換
    let roleIds: number[] = []
    userSlice.role.ids.forEach((roleId) => {
      roleIds.push(userSlice.role.entities[roleId].id)
    })

    return roleIds
  }
)

/**
 * userRoleEntities を取得する
 */
export const userRoleEntitiesSelector = createSelector(
  userSelector,
  (userSlice) => {
    return userSlice.role.entities
  }
)

/**
 * userPromise を取得する
 */
export const userPromiseSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.promise
})
