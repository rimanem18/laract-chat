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

export const updateGroups = createAsyncThunk(
  'groups/updateGroups',
  async (_, thunkApi) => {
    const response = await axios.get('/api/chat_groups/')
    return response.data.chat_groups
  }
)

export const addGroup = createAsyncThunk(
  'groups/addGroup',
  async ({ groupName }: { groupName: string }, thunkApi) => {
    const response = await axios.post('/api/chat_groups/create', {
      groupName: groupName,
    })
    return response.data
  }
)

export const groupsSlice = createSlice({
  name: 'groupsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(
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
      .addCase(fetchGroups.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.promise = 'rejected'
      })
      // updateGroups
      .addCase(
        updateGroups.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          const groups = action.payload
          state.promise = 'idle'

          // 差がなければそのまま帰る
          const diff = groups.length - state.ids.length
          if (diff === 0) {
            return
          }
          console.log(diff)

          const lastGroup = groups.slice(-diff)[0]
          state.ids.push(`group${lastGroup.id.toString()}`)
          state.entities[`group${lastGroup.id.toString}`] = lastGroup
        }
      )
      .addCase(updateGroups.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(updateGroups.rejected, (state) => {
        state.promise = 'rejected'
      })
      // addGroup
      .addCase(addGroup.fulfilled, (state) => {
        state.promise = 'idle'
      })
      .addCase(addGroup.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(addGroup.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

export const {} = groupsSlice.actions

export default groupsSlice.reducer
