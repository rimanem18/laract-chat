import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../app/store'
import { promiseState } from '../app/type'

export type ChatMessage = {
  id: number
  name: string
  content: string
  created_at: string
}

// 型定義
export interface ChatMessagesSliceState {
  ids: string[]
  entities: Record<string, ChatMessage>
  promise: promiseState
}

// 初期値
const initialState: ChatMessagesSliceState = {
  ids: [],
  entities: {
    message0: {
      id: 0,
      name: '',
      content: '',
      created_at: '',
    },
  },
  promise: 'idle',
}

export const fetchMessages = createAsyncThunk(
  'chatMessages/fetchMessages',
  async () => {
    const response = await axios.get('/api/chat_messages')
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
        (state, action: PayloadAction<ChatMessage[]>) => {
          const messages = action.payload
          state.ids = messages.map(
            (message) => `message${message.id.toString()}`
          )

          let i = 0
          messages.forEach((message) => {
            i++
            state.entities[`message${i}`] = message
          })

          state.promise = 'idle'
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

// 外部から読み取れるように
export const selectChatMessagesIds = (state: RootState) =>
  state.chatMessagesSlice.ids
export const selectChatMessagesEntities = (state: RootState) =>
  state.chatMessagesSlice.entities
export const selectChatMessagesPromise = (state: RootState) =>
  state.chatMessagesSlice.promise

export default chatMessagesSlice.reducer
