import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

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
 * userPromise を取得する
 */
export const userPromiseSelector = createSelector(userSelector, (userSlice) => {
  return userSlice.promise
})
