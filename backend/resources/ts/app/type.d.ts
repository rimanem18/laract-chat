export type PromiseState = 'idle' | 'loading' | 'rejected'

export type Role = {
  id: number
  name: string
  color: string
}

export type GroupsPayload = {
  chat_groups: {
    id: number
    name: string
  }[]
}
export type RoleGroupPayload = {
  group_id: number
  role_id: number
}[]
export type RolesPayload = {
  id: number
  name: string
  color: string
}[]

export type MessagePayload = {
  id: number
  group_id: number
  content: string
  created_at: string
  name: string
  roles: { id: number; name: string; color: string }[]
}
