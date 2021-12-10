import { mockState } from '../../app/mockState'
import { selectRoles } from '../../selectors/RolesSelector'

describe('rolesSelector', () => {
  it('Selector で rolesState の値を取得できる', () => {
    const roles = {
      allIds: selectRoles.allIds(mockState),
      byId: selectRoles.byId(mockState),
    }

    expect(roles.allIds).toEqual(['role1', 'role2'])
    expect(roles.byId).toEqual({
      role1: {
        id: 1,
        name: 'staff',
        color: '#999999',
      },
      role2: {
        id: 2,
        name: 'admin',
        color: '#cccccc',
      },
    })
  })
})
