import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { PromiseState } from '../app/type'

// 型定義
export interface AuthState {
  name: string
  email: string
  password: string
  promise: PromiseState
  message: string
}

// 初期値
const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  promise: 'idle',
  message: '',
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
        // 登録に成功したらそのままログインする
        return axios.get('/sanctum/csrf-cookie').then((response) => {
          return axios
            .post('/api/login', { email: email, password: password })
            .then((res) => {
              return res
            })
        })
      })
      .catch((err) => {
        return thunkApi.rejectWithValue(err)
      })
    return response
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
  reducers: {
    initAuthState: (state) => {
      state.name = initialState.name
      state.email = initialState.email
      state.password = initialState.password
      state.promise = initialState.promise
    },
  },
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
      .addCase(register.rejected, (state, action: any) => {
        console.log(action)

        state.message = action.payload.response.data.message
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
export const { initAuthState } = authSlice.actions

// 外部から読み取れるように
export const selectAuthName = (state: RootState) => state.authSlice.name
export const selectAuthEmail = (state: RootState) => state.authSlice.email
export const selectAuthPromise = (state: RootState) => state.authSlice.promise
export const selectAuthMessage = (state: RootState) => state.authSlice.message

export default authSlice.reducer
