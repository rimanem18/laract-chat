export type PromiseState = 'idle' | 'loading' | 'rejected'

export type Message = {
  id: number
  group_id: number
  user_id: number
  name: string
  content: string
  created_at: string
  roles: string[]
}
export type Group = {
  id: number
  name: string
  roles: string[]
}
export type Role = {
  id: number
  name: string
  color: string
}
export type RoleUser = {
  user_id: number
  role_id: number
}
export type RoleGroup = {
  group_id: number
  role_id: number
}

export type Groups = {
  byId: Record<string, Group>
  allIds: string[]
}

export type Roles = {
  byId: Record<string, Role>
  allIds: string[]
}

export type Messages = {
  byId: Record<string, Message>
  allIds: string[]
}

/**
 * Payloads
 *
 * バックエンドから送られてくるデータの型
 */
export type GroupsPayload = {
  public_groups: {
    id: number
    name: string
  }[]
  private_groups: {
    id: number
    name: string
  }[]
  role_group: {
    role_id: number
    group_id: number
  }[]
}
export type RoleGroupPayload = {
  role_group: {
    group_id: number
    role_id: number
  }[]
}
export type RolesPayload = {
  id: number
  name: string
  color: string
}
export type MessagePayload = {
  id: number
  group_id: number
  content: string
  created_at: string
  user_id: number
  name: string
}
export type RoleUserPayload = {
  user_id: number
  role_id: number
}

// Slice
export type AuthState = {
  name: string
  email: string
  password: string
  promise: PromiseState
  message: string
}
export type GroupsState = {
  groups: Groups
  roleGroup: {
    byId: Record<string, RoleGroup>
    allIds: string[]
  }
  oldestId: number
  promise: PromiseState
}
export type MenuState = {
  isOpen: boolean
}
export type PostState = {
  userId: number
  content: string
  promise: PromiseState
}
export type RolesState = {
  roles: Roles
  promise: PromiseState
}
export type UserState = {
  id: number
  name: string
  email: string
  roles: string[]
  promise: PromiseState
}
export type ChatMessagesState = {
  messages: {
    byId: Record<string, Message>
    allIds: string[]
  }
  roles: {
    byId: Record<string, Role>
    allIds: string[]
  }
  roleUser: {
    byId: Record<string, RoleUser>
    allIds: string[]
  }
  promise: PromiseState
}
