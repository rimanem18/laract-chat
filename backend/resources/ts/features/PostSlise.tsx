import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { RootState } from '../app/rootReducer'
import { promiseState } from '../app/type'


export interface PostState {
  userId: number
  content: string
  promise: promiseState
}

const initialState: PostState = {
  userId: 0,
  content: "",
  promise: 'idle'
}

type PostData = {
  userId: number
  content: string
}

export const postMessage = createAsyncThunk(
  'post/postMessage',
  async (postData: PostData, thunkApi) => {

    const response = await axios.post('/api/chat_messages/post',
      postData,
    )
    return response.data
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getContent: (state, action) => {
      state.content = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(postMessage.fulfilled, (state, aciton) => {
        state.content = ""
        state.promise = 'idle'
      })
      .addCase(postMessage.pending, (state, aciton) => {
        state.promise = 'loading'
      })
      .addCase(postMessage.rejected, (state, aciton) => {
        state.promise = 'rejected'
      })
  }
})

export const { getContent } = postSlice.actions

export const selectPost = (state: RootState) => state.postSlice


export default postSlice.reducer
