export type PromiseState = 'idle' | 'loading' | 'rejected'

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
}
export type RoleGroupPayload = {
  role_group: {
    group_id: number
    role_id: number
  }[]
}
export type RolesPayload = {
  roles: {
    id: number
    name: string
    color: string
  }[]
}
export type MessagePayload = {
  id: number
  group_id: number
  content: string
  created_at: string
  name: string
  roles: { id: number; name: string; color: string }[]
}
