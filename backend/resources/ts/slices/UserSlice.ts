import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RoleUserPayload, UserState } from '../app/type'

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
    } else {
      const user = await axios.get('/api/user')
      const roleUser = await axios.get('/api/role_user')
      userData = user.data
      roleUserData = roleUser.data.role_user
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
