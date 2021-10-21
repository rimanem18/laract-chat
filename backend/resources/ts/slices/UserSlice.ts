import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { PromiseState } from '../app/type'

// 型定義
export interface UserState {
  id: number
  name: string
  email: string
  promise: PromiseState
}

// 初期値
const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  promise: 'idle',
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get('/api/user')
  return response.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          const user = action.payload
          state.id = user.id
          state.name = user.name
          state.email = user.email
          state.promise = 'idle'
        }
      )
      .addCase(fetchUser.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(fetchUser.rejected, (state) => {
        state.id = 0
        state.name = ''
        state.email = ''
        state.promise = 'rejected'
      })
  },
})

// 外部からセットできるように
export const {} = userSlice.actions

export default userSlice.reducer
