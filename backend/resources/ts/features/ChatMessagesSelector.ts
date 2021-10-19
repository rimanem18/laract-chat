import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const chatMessagesSelector = (state: RootState) =>
  state.chatMessagesSlice

/**
 * userId を取得する
 */
export const userIdSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.id
  }
)

/**
 * userName を取得する
 */
export const userNameSelector = createSelector(
  userSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.name
  }
)

/**
 * userEmail を取得する
 */
export const userEmailSelector = createSelector(
  userSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.email
  }
)

/**
 * userPromise を取得する
 */
export const userPromiseSelector = createSelector(
  userSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.promise
  }
)
