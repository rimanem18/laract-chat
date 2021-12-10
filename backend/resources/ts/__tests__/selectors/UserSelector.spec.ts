import { mockState } from '../../app/mockState'
import {
  userEmailSelector,
  userIdSelector,
  userNameSelector,
  userPromiseSelector,
  userRoleNumberIdsSelector,
  userRolesSelector,
} from '../../selectors/UserSelector'

describe('userSelector', () => {
  it('Selector で userState の値を取得できる', () => {
    const id = userIdSelector(mockState)
    const name = userNameSelector(mockState)
    const email = userEmailSelector(mockState)
    const roles = userRolesSelector(mockState)
    const roleIds = userRoleNumberIdsSelector(mockState)
    const promise = userPromiseSelector(mockState)

    expect(id).toBe(1)
    expect(name).toBe('太郎')
    expect(email).toBe('taro@example.com')
    expect(roles).toEqual(['role1'])
    expect(roleIds).toEqual([1])
    expect(promise).toBe('idle')
  })
})
