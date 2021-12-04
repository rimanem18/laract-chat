import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'
import { rolesSlice } from '../slices/RolesSlice'

export const rolesSelector = (state: RootState) => state.rolesSlice

/**
 * roles の情報を取得する
 */
export const selectRoles = {
  allIds: createSelector(rolesSelector, (rolesSlice) => {
    return rolesSlice.roles.allIds
  }),
  byId: createSelector(rolesSelector, (rolesSlice) => {
    return rolesSlice.roles.byId
  }),
}

/**
 * promise を取得する
 */
export const rolesPromiseSelector = createSelector(
  rolesSelector,
  (rolesSlice) => {
    return rolesSlice.promise
  }
)
