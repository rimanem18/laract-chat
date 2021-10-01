import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store'
import axios from 'axios'

// 型定義
export interface UserState {
  id: number
  name: string
  email: string
}

// 初期値
const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
}

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

    setUser: (state, payloadAction: PayloadAction<UserState>) => {
      const user = payloadAction.payload
      state = user
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<UserState>) => {
        state = action.payload
      }
    )
  },
})

interface LoginForm {
  email: string
  password: string
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation<UserState, LoginForm>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

// 外部からセットできるように
export const { login, setUser } = userSlice.actions
export const { useLoginMutation } = authApi

// 外部から読み取れるように
export const selectUser = (state: RootState) => state.userSlice

export default userSlice.reducer
