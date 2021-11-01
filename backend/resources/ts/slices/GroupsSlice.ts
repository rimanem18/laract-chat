import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'react-router-redux'
import { RootState } from '../app/store'
import axios from 'axios'
import { PromiseState } from '../app/type'
import { useDefaultGroupPath } from '../app/hooks'

export type Group = {
  id: number
  name: string
}

// 型定義
export interface GroupsState {
  ids: string[]
  entities: Record<string, Group>
  promise: PromiseState
  oldestId: number
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
  oldestId: 1,
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
    const response = await axios
      .post('/api/chat_groups/create', {
        groupName: groupName,
      })
      .then((res) => {
        return axios.get('/api/chat_groups/')
      })
    return response.data.chat_groups
  }
)

export const editGroup = createAsyncThunk(
  'groups/editGroup',
  async ({ groupId, groupName }: { groupId: string; groupName: string }) => {
    const response = await axios
      .post('/api/chat_groups/edit', {
        groupId: groupId,
        groupName: groupName,
      })
      .then((res) => {
        return axios.get('/api/chat_groups/')
      })
    return response.data.chat_groups
  }
)

type deleteGroupProps = {
  groupId: string
  closeModal: () => void
}
export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async ({ groupId, closeModal }: deleteGroupProps) => {
    const response = await axios
      .post('/api/chat_groups/delete', {
        groupId: groupId,
      })
      .then((res) => {
        closeModal()
        return axios.get('/api/chat_groups/')
      })
    return response.data.chat_groups
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
          const ids = groups.map((group) => `group${group.id.toString()}`)
          state.ids = ids
          state.oldestId = Number(ids[0].replace('group', ''))
          state.promise = 'idle'

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

          const lastGroup = groups.slice(-diff)[0]
          state.ids.push(`group${lastGroup.id.toString()}`)

          state.entities[`group${lastGroup.id.toString()}`] = lastGroup
        }
      )
      .addCase(updateGroups.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(updateGroups.rejected, (state) => {
        state.promise = 'rejected'
      })
      // addGroup
      .addCase(addGroup.fulfilled, (state, action: PayloadAction<Group[]>) => {
        const groups = action.payload
        state.promise = 'idle'

        // 差がなければそのまま帰る
        const diff = groups.length - state.ids.length

        if (diff === 0) {
          return
        }

        const lastGroup = groups.slice(-diff)[0]
        state.ids.push(`group${lastGroup.id.toString()}`)

        state.entities[`group${lastGroup.id.toString()}`] = lastGroup
      })
      .addCase(addGroup.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(addGroup.rejected, (state) => {
        state.promise = 'rejected'
      })
      // edit
      .addCase(editGroup.fulfilled, (state, action: PayloadAction<Group[]>) => {
        const groups = action.payload
        state.promise = 'idle'
        state.ids = groups.map((group) => `group${group.id.toString()}`)

        groups.forEach((group) => {
          state.entities[`group${group.id}`] = group
        })
      })
      .addCase(editGroup.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(editGroup.rejected, (state) => {
        state.promise = 'rejected'
      })
      // delete
      .addCase(
        deleteGroup.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          const groups = action.payload
          state.promise = 'idle'
          state.ids = groups.map((group) => `group${group.id.toString()}`)

          groups.forEach((group) => {
            state.entities[`group${group.id}`] = group
          })

          const defaultGroupPath = useDefaultGroupPath()
          push(defaultGroupPath)
        }
      )
      .addCase(deleteGroup.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(deleteGroup.rejected, (state) => {
        state.promise = 'rejected'
      })
  },
})

export const {} = groupsSlice.actions

export default groupsSlice.reducer
