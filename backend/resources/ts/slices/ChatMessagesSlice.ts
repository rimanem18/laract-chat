import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../app/store'
import { MessagePayload, PromiseState, Role } from '../app/type'

export type ChatMessage = {
  id: number
  group_id: number
  name: string
  content: string
  created_at: string
  role_name: string
  role_color: string
}

// 型定義
export interface ChatMessagesSliceState {
  ids: string[]
  entities: Record<string, ChatMessage>
  promise: PromiseState
}

// 初期値
const initialState: ChatMessagesSliceState = {
  ids: [],
  entities: {
    message0: {
      id: 0,
      group_id: 0,
      name: '',
      content: '',
      created_at: '',
      role_name: '',
      role_color: '',
    },
  },
  promise: 'idle',
}

export const fetchMessages = createAsyncThunk(
  'chatMessages/fetchMessages',
  async () => {
    const response = await axios.get('/api/chat_messages/')
    return response.data.chat_messages
  }
)
export const updateMessages = createAsyncThunk(
  'chatMessages/updateMessages',
  async () => {
    const response = await axios.get('/api/chat_messages/')
    return response.data.chat_messages
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
        (state, action: PayloadAction<MessagePayload[]>) => {
          const messages = action.payload
          state.promise = 'idle'

          // メッセージ数が同じならそのまま帰る
          if (state.ids.length === messages.length) {
            return
          }

          state.ids = messages.map(
            (message) => `message${message.id.toString()}`
          )
          messages.forEach((message) => {
            // role がある場合のみ代入
            let role_name = ''
            let role_color = ''
            if (message.roles !== undefined) {
              role_name = message.roles[0].name
              role_color = message.roles[0].color
            }

            const entities: ChatMessage = {
              id: message.id,
              group_id: message.group_id,
              name: message.name,
              content: message.content,
              created_at: message.created_at,
              role_name: role_name,
              role_color: role_color,
            }

            state.entities[`message${message.id}`] = entities
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

          const diff = messages.length - state.ids.length
          if (diff === 0) {
            return
          }

          const i = 0
          const lastMessage = messages.slice(-diff)[i]
          state.ids.push(`message${lastMessage.id.toString()}`)
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

// 外部からセットできるように
export const {} = chatMessagesSlice.actions

export default chatMessagesSlice.reducer
