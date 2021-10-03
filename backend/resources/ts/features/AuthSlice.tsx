import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { promiseState } from '../app/type'

// 型定義
export interface AuthState {
  name: string
  email: string
  password: string
  promise: promiseState
}

// 初期値
const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  promise: 'idle'
}


type LoginForm = {
  email: string
  password: string
}
export const login = createAsyncThunk(
  'auth/login',
  async (loginForm: LoginForm, thunkApi) => {

    // ログイン時に CSRF トークンを初期化
    const response = await axios.get('/sanctum/csrf-cookie').then((response) => {
      return axios
        .post('/api/login', loginForm)
    })
    return response.data
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await axios.get('/api/logout')
    return response.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.fulfilled, (state) => {
        state.promise = 'idle'
      })
      .addCase(login.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(login.rejected, (state) => {
        state.promise = 'rejected'
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.name = ""
        state.email = ""
        state.password = ""
        state.promise = 'idle'
      })
      .addCase(logout.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(logout.rejected, (state) => {
        state.promise = 'rejected'
      })
  }
})


// 外部からセットできるように
export const { } = authSlice.actions

// 外部から読み取れるように
export const selectAuth = (state: RootState) => state.authSlice

export default authSlice.reducer
