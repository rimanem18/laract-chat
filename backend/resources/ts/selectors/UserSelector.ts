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
 * userRoles を取得する
 */
export const userRolesSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.roles
})

/**
 * userRoles 数値で取得する
 */
export const userRoleNumberIdsSelector = createSelector(
  userSelector,
  (userSlice) => {
    // 数値の ID 一覧に変換
    let roleIds: number[] = []
    userSlice.roles.forEach((roleId) => {
      roleIds.push(Number(roleId.replace('role', '')))
    })

    return roleIds
  }
)

/**
 * userPromise を取得する
 */
export const userPromiseSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.promise
})
