import {
  chatMessageIdsSelector,
  chatMessagesEntitiesSelector,
  chatMessagesPromiseSelector,
} from '../../selectors/ChatMessagesSelector'
import { mockState } from '../../app/mockState'

describe('chatMessagesSelector', () => {
  it('Selector で chatMessagesState の値を取得できる', () => {
    const ids = chatMessageIdsSelector(mockState)
    const entities = chatMessagesEntitiesSelector(mockState)
    const promise = chatMessagesPromiseSelector(mockState)

    expect(ids).toEqual(['message1', 'message2'])
    expect(entities).toEqual({
      message1: {
        id: 1,
        name: 'hoge',
        content: 'fugafuga',
        created_at: '1900-01-01',
      },
      message2: {
        id: 2,
        name: 'piyo',
        content: 'fugafuga',
        created_at: '1900-01-01',
      },
    })
    expect(promise).toBe('idle')
  })
})
