import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  ChatMessagesState,
  Message,
  MessagePayload,
  RolesPayload,
  RoleUserPayload,
} from '../app/type'

const initialState: ChatMessagesState = {
  messages: {
    byId: {},
    allIds: [],
  },
  roles: {
    byId: {},
    allIds: [],
  },
  roleUser: {
    byId: {},
    allIds: [],
  },
  promise: 'idle',
}

export const fetchMessages = createAsyncThunk(
  'chatMessages/fetchMessages',
  async ({ groupIds }: { groupIds: number[] }) => {
    const res = await axios.post('/api/chat_messages/by_group_ids', {
      groupIds: groupIds,
    })

    const response: {
      messages: MessagePayload[]
      roles: RolesPayload[]
      roleUser: RoleUserPayload[]
    } = {
      messages: res.data.data.messages,
      roles: res.data.data.roles,
      roleUser: res.data.data.role_user,
    }

    return response
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
            roles: RolesPayload[]
            roleUser: RoleUserPayload[]
          }>
        ) => {
          const messages = action.payload.messages
          const roles = action.payload.roles
          const roleUser = action.payload.roleUser
          state.promise = 'idle'

          // messages
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

            // roles
            state.roles.allIds = roles.map(
              (role) => `role${role.id.toString()}`
            )

            roles.forEach((role) => {
              const byId = {
                id: role.id,
                name: role.name,
                color: role.color,
              }
              state.roles.byId[`role${role.id.toString()}`] = byId
            })
          })
        }
      )
      .addCase(fetchMessages.pending, (state, action) => {
        state.promise = 'loading'
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

// 外部からセットできるように
export const {} = chatMessagesSlice.actions

export default chatMessagesSlice.reducer
