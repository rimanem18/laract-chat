import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../app/store'
import { PromiseState } from '../app/type'

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
  promise: PromiseState
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
export const addMessages = createAsyncThunk(
  'chatMessages/addMessages',
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
          // console.log(messages);

          state.promise = 'idle'

          // メッセージ数が同じならそのまま帰る
          if (state.ids.length === messages.length) {
            // console.log('[fetchMessages]同じ')
            return
          }

          // console.log('[fetchMessages]違う')
          state.ids = messages.map(
            (message) => `message${message.id.toString()}`
          )

          messages.forEach((message) => {
            state.entities[`message${message.id}`] = message
          })
        }
      )
      .addCase(fetchMessages.pending, (state, action) => {
        state.promise = 'loading'
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.promise = 'rejected'
      })
      // addMessage
      .addCase(
        addMessages.fulfilled,
        (state, action: PayloadAction<ChatMessage[]>) => {
          const messages = action.payload
          state.promise = 'idle'

          const diff = messages.length - state.ids.length
          if (diff === 0) {
            return
          }
          console.log(diff)

          const i = 0
          const lastMessage = messages.slice(-diff)[i]
          state.ids.push(`message${lastMessage.id.toString()}`)
          state.entities[`message${lastMessage.id.toString()}`] = lastMessage
        }
      )
      .addCase(addMessages.pending, (state, action) => {
        state.promise = 'loading'
      })
      .addCase(addMessages.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

// 外部からセットできるように
export const {} = chatMessagesSlice.actions

export default chatMessagesSlice.reducer
