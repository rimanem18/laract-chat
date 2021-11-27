import { RootState } from './store'

export const mockState: RootState = {
  authSlice: {
    name: '太郎',
    email: 'taro@example.com',
    password: 'authpassword',
    promise: 'idle',
    message: 'auth message',
  },
  chatMessagesSlice: {
    ids: ['message1', 'message2'],
    entities: {
      message1: {
        id: 1,
        name: 'hoge',
        group_id: 1,
        content: 'fugafuga',
        created_at: '1900-01-01',
        role_name: 'staff',
        role_color: '#666666',
      },
      message2: {
        id: 2,
        name: 'piyo',
        group_id: 2,
        content: 'fugafuga',
        created_at: '1900-01-01',
        role_name: 'staff',
        role_color: '#666666',
      },
    },
    promise: 'idle',
  },
  groupSlice: {
    groups: {
      byId: {
        group1: {
          id: 1,
          name: 'hello group',
          roles: ['role2', 'role3'],
        },
        group2: {
          id: 2,
          name: 'second group',
          roles: ['role1'],
        },
      },
      allIds: ['group1', 'group2'],
    },
    roles: {
      byId: {
        role1: {
          id: 1,
          name: 'root',
          color: '#999999',
        },
        role2: {
          id: 2,
          name: 'admin',
          color: '#cccccc',
        },
        role3: {
          id: 3,
          name: 'staff',
          color: '#f2f2f2',
        },
      },
      allIds: ['role1', 'role2', 'role3'],
    },
    oldestId: 1,
    promise: 'idle',
  },
  menuSlice: {
    isOpen: false,
  },
  postSlice: {
    userId: 1,
    content: 'fugafuga',
    promise: 'idle',
  },
  userSlice: {
    id: 1,
    name: '太郎',
    email: 'taro@example.com',
    role: {
      ids: ['role1'],
      entities: {
        role1: {
          id: 1,
          name: 'staff',
        },
      },
    },
    promise: 'idle',
  },
}
