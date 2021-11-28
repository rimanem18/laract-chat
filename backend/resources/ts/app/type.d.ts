export type PromiseState = 'idle' | 'loading' | 'rejected'

export type Role = {
  id: number
  name: string
  color: string
}
export type RoleGroup = {
  group_id: number
  role_id: number
}

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
