import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../app/store'
import {
  Message,
  MessagePayload,
  Messages,
  PromiseState,
  Role,
  RoleGroupPayload,
  Roles,
  RolesPayload,
  RoleUserPayload,
} from '../app/type'

// 型定義
type ChatMessagesState = {
  messages: {
    byId: Record<string, Message>
    allIds: string[]
  }
  roleUser: {
    byId: Record<string, RoleUser>
    allIds: string[]
  }
  roles: {
    byId: Record<string, Role>
    allIds: string[]
  }
  promise: PromiseState
}

const initialState: ChatMessagesState = {
  messages: {
    byId: {},
    allIds: [],
  },
  roleUser: {
    byId: {},
    allIds: [],
  },
  roles: {
    byId: {},
    allIds: [],
  },
  promise: 'idle',
}

export const fetchMessages = createAsyncThunk(
  'chatMessages/fetchMessages',
  async () => {
    const messages = await axios.post('/api/chat_messages/by_group_ids')
    const roleUser = await axios.get('/api/role_user')
    const roles = await axios.get('/api/roles')
    const response = {
      messages: messages.data,
      roleUser: roleUser.data,
      roles: roles.data,
    }
    return response
  }
)
export const updateMessages = createAsyncThunk(
  'chatMessages/updateMessages',
  async () => {
    const response = await axios.get('/api/chat_messages/')
    return response.data
  }
)

export const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMessages.fulfilled,
        (
          state,
          action: PayloadAction<{
            messages: MessagePayload[]
            roleUser: RoleUserPayload
            roles: RolesPayload
          }>
        ) => {
          const messages = action.payload.messages
          const roleUser = action.payload.roleUser.role_user
          const roles = action.payload.roles.roles
          state.promise = 'idle'

          state.messages.allIds = messages.map(
            (message) => `message${message.id.toString()}`
          )
          messages.forEach((message) => {
            const roleUser_temp = roleUser.filter(
              (role) => role.user_id === message.user_id
            )
            const roleIds = roleUser_temp.map(
              (role) => `role${role.role_id.toString()}`
            )

            const byId: Message = {
              id: message.id,
              group_id: message.group_id,
              user_id: message.user_id,
              name: message.name,
              content: message.content,
              created_at: message.created_at,
              roles: roleIds,
            }

            state.messages.byId[`message${message.id}`] = byId
          })
        }
      )
      .addCase(fetchMessages.pending, (state, action) => {
        state.promise = 'loading'
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.promise = 'rejected'
      })
      // updateMessage
      .addCase(
        updateMessages.fulfilled,
        (state, action: PayloadAction<ChatMessage[]>) => {
          const messages = action.payload

          state.promise = 'idle'

          const diff = messages.length - state.allIds.length
          if (diff === 0) {
            return
          }

          const i = 0
          const lastMessage = messages.slice(-diff)[i]
          state.allIds.push(`message${lastMessage.id.toString()}`)
          state.entities[`message${lastMessage.id.toString()}`] = lastMessage
        }
      )
      .addCase(updateMessages.pending, (state, action) => {
        state.promise = 'loading'
      })
      .addCase(updateMessages.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

const getResponse = async (roleIds: number[]) => {
  const chatMessages = await axios.post('/api/chat_messages/by_role_ids', {
    roleIds: roleIds,
  })

  const roleGroup = await axios.get('/api/role_group')
  const roles = await axios.get('/api/roles')

  const response: {
    groups: MessagePayload
    roleGroup: RoleGroupPayload
    roles: RolesPayload
  } = {
    groups: messages.data,
    roleGroup: roleGroup.data,
    roles: roles.data,
  }
  return response
}

// 外部からセットできるように
export const {} = chatMessagesSlice.actions

export default chatMessagesSlice.reducer
