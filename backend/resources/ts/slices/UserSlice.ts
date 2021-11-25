import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { PromiseState } from '../app/type'
import { shallowEqual } from 'react-redux'
import { useUserState } from '../app/hooks'

// 型定義
export interface UserState {
  id: number
  name: string
  email: string
  role: {
    ids: string[]
    entities: Record<string, Role>
  }
  promise: PromiseState
}

export type Role = {
  id: number
  name: string
}
// 初期値
const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  role: {
    ids: ['role0'],
    entities: {
      role0: {
        id: 0,
        name: '',
      },
    },
  },
  promise: 'idle',
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ userId }: { userId: number }, _thunkApi) => {
    const user = await axios.get('/api/user')
    let roles
    if (userId !== 0) {
      roles = await axios.post('/api/roles', {
        userId: userId,
      })
    }

    const response = {
      user: user.data,
      roles: roles?.data,
    }
    return response
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(
        fetchUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: UserState
            roles: Role[]
          }>
        ) => {
          const user = action.payload.user
          const roles = action.payload.roles
          state.promise = 'idle'

          state.id = user.id
          state.name = user.name
          state.email = user.email

          if (roles !== undefined) {
            // Slice と差がなければ帰る
            if (shallowEqual(roles, state.role.entities)) {
              return
            }

            state.role.ids = roles.map((role) => `role${role.id.toString()}`)

            roles.forEach((role) => {
              state.role.entities[`role${role.id}`] = role
            })
          }
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
