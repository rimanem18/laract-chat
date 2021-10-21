import {
  chatMessageIdsSelector,
  chatMessagesEntitiesSelector,
  chatMessagesPromiseSelector,
} from './ChatMessagesSelector'
import { testState } from './selector-tests-utils'

describe('chatMessagesSelector', () => {
  it('Selector で chatMessagesState の値を取得できる', () => {
    const ids = chatMessageIdsSelector(testState)
    const entities = chatMessagesEntitiesSelector(testState)
    const promise = chatMessagesPromiseSelector(testState)

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
