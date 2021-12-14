import { RootState } from './store'
import { Group, Message, PromiseState, Role, RoleGroup } from './type'

type UseAuthState = {
  name: string
  email: string
  password: string
  message: string
  promise: PromiseState
}
type UseUserState = {
  id: number
  email: string
  name: string
  roles: string[]
  roleNumberIds: number[]
  promise: PromiseState
}
type UseChatMessagesState = {
  messages: {
    byId: Record<string, Message>
    allIds: string[]
  }
  promise: PromiseState
}
type UseGroupsState = {
  groups: {
    byId: Record<string, Group>
    allIds: string[]
    allNumberIds: number[]
  }
  roleGroup: {
    byId: Record<string, RoleGroup>
    allIds: string[]
  }
  promise: PromiseState
  oldestId: number
  defaultPath: string
}
type UsePostState = {
  userId: number
  content: string
  promise: PromiseState
}
type MockState = {
  authSlice: UseAuthState
  chatMessagesSlice: UseChatMessagesState
  groupsSlice: UseGroupsState
  userSlice: UseUserState
  menuSlice: { isOpen: false }
  postSlice: UsePostState
}

export const mockState: RootState = {
  authSlice: {
    name: '太郎',
    email: 'taro@example.com',
    password: 'authpassword',
    promise: 'idle',
    message: 'auth message',
  },
  chatMessagesSlice: {
    messages: {
      allIds: ['message1', 'message2'],
      byId: {
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
      },
    },
    roleUser: {
      byId: {},
      allIds: [],
    },

    promise: 'idle',
  },
  groupsSlice: {
    groups: {
      byId: {
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
      },
      allIds: ['group1', 'group2'],
    },
    roleGroup: {
      byId: {},
      allIds: [],
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
  rolesSlice: {
    roles: {
      byId: {
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
      },
      allIds: ['role1', 'role2'],
    },
    promise: 'idle',
  },
  userSlice: {
    id: 1,
    name: '太郎',
    email: 'taro@example.com',
    roles: ['role1'],
    promise: 'idle',
  },
}
