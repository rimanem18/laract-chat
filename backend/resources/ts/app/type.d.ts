export type PromiseState = 'idle' | 'loading' | 'rejected'

export type Role = {
  id: number
  name: string
  color: string
}

export type MessagePayload = {
  id: number
  group_id: number
  content: string
  created_at: string
  name: string
  roles: { id: number; name: string; color: string }[]
}
