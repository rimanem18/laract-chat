import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PromiseState } from '../app/type'

export interface PostState {
  userId: number
  content: string
  promise: PromiseState
}

const initialState: PostState = {
  userId: 0,
  content: '',
  promise: 'idle',
}

type PostData = {
  userId: number
  content: string
}

export const postMessage = createAsyncThunk(
  'post/postMessage',
  async (postData: PostData, thunkApi) => {
    const response = await axios.post('/api/chat_messages/post', postData)
    return response.data
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMessage.fulfilled, (state, aciton) => {
        state.content = ''
        state.promise = 'idle'
      })
      .addCase(postMessage.pending, (state, aciton) => {
        state.promise = 'loading'
      })
      .addCase(postMessage.rejected, (state, aciton) => {
        state.promise = 'rejected'
      })
  },
})

export const { getContent } = postSlice.actions

export default postSlice.reducer
