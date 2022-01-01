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

/**
 * promise を取得する
 */
export const chatMessagesPromiseSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => {
    return chatMessagesSlice.promise
  }
)

export const messageNameSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => (id: string) => {
    const message = chatMessagesSlice.messages.byId[id]
    if (!message) return ''
    return message.name
  }
)
export const messageContentSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => (id: string) => {
    const message = chatMessagesSlice.messages.byId[id]
    if (!message) return ''

    // 2個以上の改行を2個改行におさめる
    const content = message.content.replace(/\n{2,}/g, '\n\n')

    return content
  }
)
export const messageDatetimeSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => (id: string) => {
    const message = chatMessagesSlice.messages.byId[id]
    if (!message) return ''

    // ゼロ埋め
    const zeroPadding = (num: number, len: number) => {
      return (Array(len).join('0') + num).slice(-len)
    }

    // 日付フォーマット
    const date = new Date(message.created_at)
    const year = date.getFullYear()
    const month = zeroPadding(date.getMonth() + 1, 2)
    const day = zeroPadding(date.getDate(), 2)
    const hour = zeroPadding(date.getHours(), 2)
    const min = zeroPadding(date.getMinutes(), 2)
    const datetime = `${year}/${month}/${day} ${hour}:${min}`

    return datetime
  }
)
export const messageGroupIdSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => (id: string) => {
    const message = chatMessagesSlice.messages.byId[id]
    if (!message) return ''

    return message.group_id
  }
)

export const messageRoleColorSelector = createSelector(
  chatMessagesSelector,
  (chatMessagesSlice) => (id: string) => {
    const message = chatMessagesSlice.messages.byId[id]
    if (!message) return ''

    let role = chatMessagesSlice.roles.byId[message.roles[0]]
    if (!role) return ''

    if (role === undefined) {
      // ロールを持っていない場合は無難なデータを作って渡す
      role = {
        id: 0,
        name: '',
        color: '#333333',
      }
    }
    const roleColor = role.color

    return roleColor
  }
)
