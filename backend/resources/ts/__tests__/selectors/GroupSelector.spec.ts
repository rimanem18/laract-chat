import { mockState } from '../../app/mockState'
import {
  groupNameSelector,
  groupPathSelector,
  groupsOldestIdSelector,
  groupsPromiseSelector,
  selectGroups,
  selectRoleGroup,
} from '../../selectors/GroupsSelector'

describe('groupSelector', () => {
  it('Selector で groups の値を取得できる', () => {
    const groups = {
      allIds: selectGroups.allIds(mockState),
      byId: selectGroups.byId(mockState),
    }

    expect(groups.allIds).toEqual(['group1', 'group2'])
    expect(groups.byId).toEqual({
      group1: {
        id: 1,
        name: 'hello',
        roles: ['role1'],
      },
      group2: {
        id: 2,
        name: 'world',
        roles: ['role1', 'role2'],
      },
    })

    const name = groupNameSelector(mockState)('group1')
    const path = groupPathSelector(mockState)('group1')

    expect(name).toBe('hello')
    expect(path).toBe('/groups/1')
  })

  it('Selector で roleGroup の値を取得できる', () => {
    const roleGroup = {
      allIds: selectRoleGroup.allIds(mockState),
      byId: selectRoleGroup.byId(mockState),
    }

    expect(roleGroup.allIds).toEqual([])
    expect(roleGroup.byId).toEqual({})
  })

  it('Selector で promise と oldestId を取得できる', () => {
    const promise = groupsPromiseSelector(mockState)
    const oldestId = groupsOldestIdSelector(mockState)

    expect(promise).toBe('idle')
    expect(oldestId).toBe(1)
  })
})
