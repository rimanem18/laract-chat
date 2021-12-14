import {
  chatMessagesPromiseSelector,
  selectMessages,
} from '../../selectors/ChatMessagesSelector'
import { mockState } from '../../app/mockState'

describe('chatMessagesSelector', () => {
  it('Selector で chatMessagesState の値を取得できる', () => {
    const messages = {
      allIds: selectMessages.allIds(mockState),
      byId: selectMessages.byId(mockState),
    }
    const promise = chatMessagesPromiseSelector(mockState)

    expect(messages.allIds).toEqual(['message1', 'message2'])
    expect(messages.byId).toEqual({
      message1: {
        id: 1,
        name: 'hoge',
        user_id: 1,
        group_id: 1,
        content: 'fugafuga',
        created_at: '1900-01-01',
        roles: ['role1'],
      },
      message2: {
        id: 2,
        name: 'piyo',
        user_id: 2,
        group_id: 2,
        content: 'fugafuga',
        created_at: '1900-01-01',
        roles: ['role1', 'role2'],
      },
    })
    expect(promise).toBe('idle')
  })
})
