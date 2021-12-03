import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const chatMessagesSelector = (state: RootState) =>
  state.chatMessagesSlice

export const selectMessages = {
  /**
   * メッセージのID一覧を取得する
   */
  allIds: createSelector(chatMessagesSelector, (chatMessagesSlice) => {
    return chatMessagesSlice.messages.allIds
  }),
  /**
   * メッセージの実体を取得する
   */
  byId: createSelector(chatMessagesSelector, (chatMessagesSlice) => {
    return chatMessagesSlice.messages.byId
  }),
}

export const selectRoles = {
  /**
   * ロールのID一覧を取得する
   */
  allIds: createSelector(chatMessagesSelector, (chatMessagesSlice) => {
    return chatMessagesSlice.roles.allIds
  }),
  /**
   * ロールの実体を取得する
   */
  byId: createSelector(chatMessagesSelector, (chatMessagesSlice) => {
    return chatMessagesSlice.roles.byId
  }),
}

/**
 * promise を取得する
 */
export const chatMessagesPromiseSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.promise
  }
)
