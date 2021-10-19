import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { promiseState } from '../app/type'

// 型定義
export interface UserState {
  id: number
  name: string
  email: string
  promise: promiseState
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
  reducers: {
    login: (
      state,
      payloadAction: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = payloadAction.payload

      // ログイン時に CSRF トークンを初期化
      axios.get('/sanctum/csrf-cookie').then((response) => {
        axios
          .post('/api/login', {
            email: email,
            password: password,
          })
          .then((response) => {
            console.log('[login]ログイン成功')
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error.response)
            console.log('[login]ログイン失敗')
          })
      })
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.fulfilled, (state, action) => {
        const user = action.payload
        state.id = user.id
        state.name = user.name
        state.email = user.email
        state.promise = 'idle'
      })
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

// 外部から読み取れるように
export const selectUser = (state: RootState) => state.userSlice
export const selectUserId = (state: RootState) => state.userSlice.id
export const selectUserName = (state: RootState) => state.userSlice.name
export const selectUserEmail = (state: RootState) => state.userSlice.email
export const selectUserPromise = (state: RootState) => state.userSlice.promise

export default userSlice.reducer
