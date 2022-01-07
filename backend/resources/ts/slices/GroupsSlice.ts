import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { WritableDraft } from 'immer/dist/internal'
import { GroupsPayload, GroupsState } from '../app/type'

// 初期値
const initialState: GroupsState = {
  groups: {
    byId: {},
    allIds: [],
  },
  roleGroup: {
    byId: {},
    allIds: [],
  },
  oldestId: 1,
  promise: 'idle',
}

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ roleIds }: { roleIds: number[] }) => {
    const response = getResponse(roleIds)
    return response
  }
)

export const addGroup = createAsyncThunk(
  'groups/addGroup',
  async ({ roleIds, groupName }: { roleIds: number[]; groupName: string }) => {
    const postUrl = '/api/chat_groups/create'
    const postData = {
      groupName: groupName,
    }
    const response = getResponse(roleIds, postUrl, postData)
    return response
  }
)

type EditGroupProps = {
  groupId: string
  groupName: string
  roleIds: number[]
}
export const editGroup = createAsyncThunk(
  'groups/editGroup',
  async ({ groupId, groupName, roleIds }: EditGroupProps) => {
    const postUrl = '/api/chat_groups/edit'
    const postData = {
      groupId: groupId,
      groupName: groupName,
    }
    const response = getResponse(roleIds, postUrl, postData)
    return response
  }
)

type deleteGroupProps = {
  groupId: string
  roleIds: number[]
}
export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async ({ groupId, roleIds }: deleteGroupProps) => {
    const postUrl = '/api/chat_groups/delete'
    const postData = {
      groupId: groupId,
    }
    const response = getResponse(roleIds, postUrl, postData)
    return response
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
        (
          state,
          action: PayloadAction<{
            groups: GroupsPayload
          }>
        ) => {
          fetch(state, action)
        }
      )
      .addCase(fetchGroups.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.promise = 'rejected'
      })
      // addGroup
      .addCase(
        addGroup.fulfilled,
        (
          state,
          action: PayloadAction<{
            groups: GroupsPayload
          }>
        ) => {
          fetch(state, action)
        }
      )
      .addCase(addGroup.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(addGroup.rejected, (state) => {
        state.promise = 'rejected'
      })
      // edit
      .addCase(
        editGroup.fulfilled,
        (
          state,
          action: PayloadAction<{
            groups: GroupsPayload
          }>
        ) => {
          fetch(state, action)
        }
      )
      .addCase(editGroup.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(editGroup.rejected, (state) => {
        state.promise = 'rejected'
      })
      // delete
      .addCase(
        deleteGroup.fulfilled,
        (
          state,
          action: PayloadAction<{
            groups: GroupsPayload
          }>
        ) => {
          fetch(state, action)
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

const fetch = (
  state: WritableDraft<GroupsState>,
  action: PayloadAction<{
    groups: GroupsPayload
  }>
) => {
  const private_groups = action.payload.groups.private_groups
  const public_groups = action.payload.groups.public_groups
  const roleGroup = action.payload.groups.role_group
  state.promise = 'idle'

  const groups = public_groups.concat(private_groups)

  // Group
  state.groups.allIds = groups.map((group) => `group${group.id.toString()}`)

  groups.forEach((group) => {
    const roleIds = roleGroup.filter((item) => item.group_id === group.id)
    const roles = roleIds.map((role) => `role${role.role_id}`)

    const byId = {
      id: group.id,
      name: group.name,
      roles: roles,
    }
    state.groups.byId[`group${group.id}`] = byId
  })
  state.oldestId = Number(state.groups.allIds[0].replace('group', ''))
}

type PostData = {
  groupId?: string
  groupName?: string
}
const getResponse = async (
  roleIds: number[],
  postUrl?: string,
  postData?: PostData
) => {
  let res
  if (postUrl !== undefined) {
    res = await axios.post(postUrl, postData).then((res) => {
      return axios.post('/api/chat_groups/by_role_ids', {
        roleIds: roleIds,
      })
    })
  } else {
    res = await axios.post('/api/chat_groups/by_role_ids', {
      roleIds: roleIds,
    })
  }

  const response: {
    groups: GroupsPayload
  } = {
    groups: {
      public_groups: res.data.public_groups,
      private_groups: res.data.private_groups,
      role_group: res.data.role_group,
    },
  }

  return response
}

export const {} = groupsSlice.actions

export default groupsSlice.reducer
