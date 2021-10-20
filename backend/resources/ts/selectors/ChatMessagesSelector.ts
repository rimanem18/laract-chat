import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const chatMessagesSelector = (state: RootState) =>
  state.chatMessagesSlice

/**
 * ids を取得する
 */
export const chatMessageIdsSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.ids
  }
)

/**
 * entities を取得する
 */
export const chatMessagesEntitiesSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.entities
  }
)

/**
 * promise を取得する
 */
export const chatMessagesPromiseSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.promise
  }
)
