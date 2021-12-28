import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { PromiseState, RoleUserPayload } from '../app/type'
import { shallowEqual } from 'react-redux'
import { useUserState } from '../app/hooks'

// 型定義
export interface UserState {
  id: number
  name: string
  email: string
  roles: string[]
  promise: PromiseState
}

// 初期値
const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  roles: [],
  promise: 'idle',
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ userId }: { userId: number }, _thunkApi) => {
    let userData: UserState
    let roleUserData: RoleUserPayload[]

    if (userId !== 0) {
      const res = await axios.post('/api/user/by_user_id', {
        userId: userId,
      })
      userData = res.data.user
      roleUserData = res.data.role_user
      console.log({
        number: 1,
        user: userData,
        roleUser: roleUserData,
        res: res,
      })
    } else {
      const user = await axios.get('/api/user')
      const roleUser = await axios.get('/api/role_user')
      userData = user.data
      roleUserData = roleUser.data.role_user
      console.log({ number: 2, user: userData, roleUser: roleUserData })
    }

    const response: {
      user: UserState
      roleUser: RoleUserPayload[]
    } = {
      user: userData,
      roleUser: roleUserData,
    }
    return response
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUserState: (state) => {
      state.id = initialState.id
      state.email = initialState.email
      state.name = initialState.name
      state.roles = initialState.roles
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(
        fetchUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: UserState
            roleUser: RoleUserPayload[]
          }>
        ) => {
          const user = action.payload.user
          const roleUser = action.payload.roleUser
          state.promise = 'idle'

          if (user !== undefined) {
            const roleUser_temp = roleUser.filter(
              (role) => role.user_id === user.id
            )
            const roleIds = roleUser_temp.map(
              (role) => `role${role.role_id.toString()}`
            )

            state.id = user.id
            state.name = user.name
            state.email = user.email
            state.roles = roleIds
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
        state.roles = []
        state.promise = 'rejected'
      })
  },
})

// 外部からセットできるように
export const { initUserState } = userSlice.actions

export default userSlice.reducer
