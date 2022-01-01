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
