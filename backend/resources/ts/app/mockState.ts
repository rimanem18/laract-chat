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
  groupsSlice: {
    groups: {
      byId: {
        gorup1: {
          id: 1,
          name: 'Hello Group',
          roles: [],
        },
        gorup2: {
          id: 1,
          name: 'Hello Group',
          roles: ['role1'],
        },
        gorup3: {
          id: 1,
          name: 'Hello Group',
          roles: ['role1', 'role2'],
        },
      },
      allIds: ['group1', 'group2', 'group3'],
    },
    roles: {
      byId: {
        role1: {
          id: 1,
          name: 'admin',
          color: '#999',
        },
        role2: {
          id: 2,
          name: 'staff',
          color: '#ccc',
        },
        role3: {
          id: 3,
          name: 'common',
          color: '#222',
        },
      },
      allIds: ['role1', 'role2', 'role3'],
    },
    promise: 'idle',
    oldestId: 1,
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
