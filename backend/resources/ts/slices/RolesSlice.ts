import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PromiseState, Roles, RolesPayload } from '../app/type'

// 型定義
export interface RolesState {
  roles: Roles
  promise: PromiseState
}

// 初期値
const initialState: RolesState = {
  roles: {
    byId: {},
    allIds: [],
  },
  promise: 'idle',
}

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const roles = await axios.get('/api/roles')
  const response: {
    roles: RolesPayload[]
  } = {
    roles: roles.data.roles,
  }
  return response
})

export const rolesSlice = createSlice({
  name: 'rolesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(
        fetchRoles.fulfilled,
        (
          state,
          action: PayloadAction<{
            roles: RolesPayload[]
          }>
        ) => {
          const roles = action.payload.roles
          state.promise = 'idle'

          state.roles.allIds = roles.map((role) => `role${role.id.toString()}`)
          roles.forEach((role) => {
            const byId = {
              id: role.id,
              name: role.name,
              color: role.color,
            }
            state.roles.byId[`role${role.id.toString()}`] = byId
          })
        }
      )
      .addCase(fetchRoles.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(fetchRoles.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

export default rolesSlice.reducer
