import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../app/store'
import {
  Message,
  MessagePayload,
  PromiseState,
  RoleUser,
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
  promise: 'idle',
}

export const fetchMessages = createAsyncThunk(
  'chatMessages/fetchMessages',
  async ({ groupIds }: { groupIds: number[] }) => {
    const messages = await axios.post('/api/chat_messages/by_group_ids', {
      groupIds: groupIds,
    })
    const roleUser = await axios.get('/api/role_user')
    const response: {
      messages: MessagePayload[]
      roleUser: RoleUserPayload
    } = {
      messages: messages.data,
      roleUser: roleUser.data,
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
            roleUser: RoleUserPayload
          }>
        ) => {
          const messages = action.payload.messages
          const roleUser = action.payload.roleUser.role_user
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
  },
})

// 外部からセットできるように
export const {} = chatMessagesSlice.actions

export default chatMessagesSlice.reducer
