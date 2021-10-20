import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const postSelector = (state: RootState) => state.postSlice

/**
 * userId を取得する
 */
export const postUserIdSelector = createSelector(postSelector, (postSlice) => {
  return postSlice.userId
})

/**
 * content を取得する
 */
export const postContentSelector = createSelector(postSelector, (postSlice) => {
  return postSlice.content
})

/**
 * promise を取得する
 */
export const postPromiseSelector = createSelector(postSelector, (postSlice) => {
  return postSlice.promise
})
