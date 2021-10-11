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
  promise: 'idle',
}

type RegisterForm = {
  name: string
  email: string
  password: string
}
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: RegisterForm, thunkApi) => {
    const response = await axios
      .post('/api/register', { name: name, email: email, password: password })
      .then((res) => {
        return axios.get('/sanctum/csrf-cookie').then((response) => {
          return axios.post('/api/login', { email: email, password: password })
        })
      })
    return response.data
  }
)

type LoginForm = {
  email: string
  password: string
}
export const login = createAsyncThunk(
  'auth/login',
  async (loginForm: LoginForm, thunkApi) => {
    // ログイン時に CSRF トークンを初期化
    const response = await axios
      .get('/sanctum/csrf-cookie')
      .then((response) => {
        return axios.post('/api/login', loginForm)
      })
    return response.data
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.get('/api/logout')
  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.fulfilled, (state) => {
        state.promise = 'idle'
        location.href = '/'
      })
      .addCase(register.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(register.rejected, (state) => {
        state.promise = 'rejected'
      })
      // login
      .addCase(login.fulfilled, (state) => {
        state.promise = 'idle'
        location.href = '/'
      })
      .addCase(login.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(login.rejected, (state) => {
        state.promise = 'rejected'
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.promise = 'idle'
      })
      .addCase(logout.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(logout.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

// 外部からセットできるように
export const {} = authSlice.actions

// 外部から読み取れるように
export const selectAuthName = (state: RootState) => state.authSlice.name
export const selectAuthEmail = (state: RootState) => state.authSlice.email
export const selectAuthPromise = (state: RootState) => state.authSlice.promise

export default authSlice.reducer
