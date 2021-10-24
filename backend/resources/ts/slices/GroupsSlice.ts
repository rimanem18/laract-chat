import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { PromiseState } from '../app/type'

type Group = {
  id: number
  name: string
}

// 型定義
export interface GroupsState {
  ids: string[]
  entities: Record<string, Group>
  promise: PromiseState
}

// 初期値
const initialState: GroupsState = {
  ids: [],
  entities: {
    group0: {
      id: 0,
      name: '',
    },
  },
  promise: 'idle',
}

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, thunkApi) => {
    const response = await axios.get('/api/chat_groups/')
    return response.data.chat_groups
  }
)

export const groupsSlice = createSlice({
  name: 'groupsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        // fetch
        fetchGroups.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          const groups = action.payload
          state.promise = 'idle'
          state.ids = groups.map((group) => `group${group.id.toString()}`)

          groups.forEach((group) => {
            state.entities[`group${group.id}`] = group
          })
        }
      )
      .addCase(fetchGroups.pending, (state, action) => {
        state.promise = 'loading'
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

export const {} = groupsSlice.actions

export default groupsSlice.reducer
