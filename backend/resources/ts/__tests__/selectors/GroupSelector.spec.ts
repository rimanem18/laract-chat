import { mockState } from '../../app/mockState'
import {
  groupIdsSelector,
  groupsEntitiesSelector,
  groupsOldestIdSelector,
  groupsPromiseSelector,
} from '../../selectors/GroupsSelector'

describe('groupSelector', () => {
  it('Selector で groupState の値を取得できる', () => {
    const ids = groupIdsSelector(mockState)
    const entities = groupsEntitiesSelector(mockState)
    const promise = groupsPromiseSelector(mockState)
    const oldestId = groupsOldestIdSelector(mockState)

    expect(ids).toEqual(['group1', 'group2'])
    expect(entities).toEqual({
      group1: {
        id: 1,
        name: 'hoge',
      },
      group2: {
        id: 2,
        name: 'piyo',
      },
    })
    expect(promise).toBe('idle')
    expect(oldestId).toBe(1)
  })
})
