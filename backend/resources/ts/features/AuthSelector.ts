import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const authSelector = (state: RootState) => state.authSlice

/**
 * name を取得する
 */
export const authNameSelector = createSelector(authSelector, (authSlice) => {
  return authSlice.name
})

/**
 * email を取得する
 */
export const authEmailSelector = createSelector(authSelector, (authSlice) => {
  return authSlice.email
})

/**
 * password を取得する
 */
export const authPasswordSelector = createSelector(
  authSelector,
  (authSlice) => {
    return authSlice.password
  }
)

/**
 * message を取得する
 */
export const authMessageSelector = createSelector(authSelector, (authSlice) => {
  return authSlice.message
})

/**
 * promise を取得する
 */
export const authPromiseSelector = createSelector(authSelector, (authSlice) => {
  return authSlice.promise
})
