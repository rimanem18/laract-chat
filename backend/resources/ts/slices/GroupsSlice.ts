import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { WritableDraft } from 'immer/dist/internal'
import {
  GroupsPayload,
  PromiseState,
  Role,
  RoleGroup,
  RoleGroupPayload,
  RolesPayload,
} from '../app/type'

// 型定義
export interface GroupsState {
  groups: Groups
  roles: Roles
  promise: PromiseState
  oldestId: number
}

type Groups = {
  byId: Record<string, Group>
  allIds: string[]
}
export type Group = {
  id: number
  name: string
  roles: string[]
}

type Roles = {
  byId: Record<string, Role>
  allIds: string[]
}

type GroupSlice = {
  groups: Groups
  roles: Roles
  oldestId: number
  promise: PromiseState
}
const groupSlice: GroupSlice = {
  groups: {
    byId: {
      group1: {
        id: 1,
        name: 'hello group',
        roles: ['role2', 'role3'],
      },
      group2: {
        id: 2,
        name: 'second group',
        roles: ['role1'],
      },
    },
    allIds: ['group1', 'group2'],
  },
  roles: {
    byId: {
      role1: {
        id: 1,
        name: 'root',
        color: '#999999',
      },
      role2: {
        id: 2,
        name: 'admin',
        color: '#cccccc',
      },
      role3: {
        id: 3,
        name: 'staff',
        color: '#f2f2f2',
      },
    },
    allIds: ['role1', 'role2', 'role3'],
  },
  oldestId: 1,
  promise: 'idle',
}

// 初期値
const initialState: GroupSlice = {
  groups: {
    byId: {},
    allIds: [],
  },
  roles: {
    byId: {},
    allIds: [],
  },
  oldestId: 1,
  promise: 'idle',
}

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ roleIds }: { roleIds: number[] }) => {
    const groups = await axios
      .post('/api/chat_groups/by_role_ids', {
        roleIds: roleIds,
      })
      .then()
    const roleGroup = await axios.get('/api/role_group')
    const roles = await axios.get('/api/roles')

    const response: {
      groups: GroupsPayload
      roleGroup: RoleGroupPayload
      roles: RolesPayload
    } = {
      groups: groups.data,
      roleGroup: roleGroup.data,
      roles: roles.data,
    }
    return response
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
  async ({ roleIds, groupName }: { roleIds: number[]; groupName: string }) => {
    const groups = await axios
      .post('/api/chat_groups/create', {
        groupName: groupName,
      })
      .then((res) => {
        return axios.post('/api/chat_groups/by_role_ids', {
          roleIds: roleIds,
        })
      })

    const roleGroup = await axios.get('/api/role_group')
    const roles = await axios.get('/api/roles')

    const response: {
      groups: GroupsPayload
      roleGroup: RoleGroupPayload
      roles: RolesPayload
    } = {
      groups: groups.data,
      roleGroup: roleGroup.data,
      roles: roles.data,
    }
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
    const groups = await axios
      .post('/api/chat_groups/edit', {
        groupId: groupId,
        groupName: groupName,
      })
      .then((res) => {
        return axios.post('/api/chat_groups/by_role_ids', {
          roleIds: roleIds,
        })
      })

    const roleGroup = await axios.get('/api/role_group')
    const roles = await axios.get('/api/roles')

    const response: {
      groups: GroupsPayload
      roleGroup: RoleGroupPayload
      roles: RolesPayload
    } = {
      groups: groups.data,
      roleGroup: roleGroup.data,
      roles: roles.data,
    }
    return response
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
        (
          state,
          action: PayloadAction<{
            groups: GroupsPayload
            roleGroup: RoleGroupPayload
            roles: RolesPayload
          }>
        ) => {
          const private_groups = action.payload.groups.private_groups
          const public_groups = action.payload.groups.public_groups
          const roleGroup = action.payload.roleGroup.role_group
          const roles = action.payload.roles.roles
          state.promise = 'idle'

          const groups = public_groups.concat(private_groups)
          fetch(state, groups, roleGroup, roles)
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
          const diff = groups.length - state.groups.allIds.length

          if (diff === 0) {
            return
          }

          const lastGroup = groups.slice(-diff)[0]
          state.groups.allIds.push(`group${lastGroup.id.toString()}`)

          state.groups.byId[`group${lastGroup.id.toString()}`] = lastGroup
        }
      )
      .addCase(updateGroups.pending, (state) => {
        state.promise = 'loading'
      })
      .addCase(updateGroups.rejected, (state) => {
        state.promise = 'rejected'
      })
      // addGroup
      .addCase(
        addGroup.fulfilled,
        (
          state,
          action: PayloadAction<{
            groups: GroupsPayload
            roleGroup: RoleGroupPayload
            roles: RolesPayload
          }>
        ) => {
          const private_groups = action.payload.groups.private_groups
          const public_groups = action.payload.groups.public_groups
          const roleGroup = action.payload.roleGroup.role_group
          const roles = action.payload.roles.roles
          state.promise = 'idle'

          const groups = public_groups.concat(private_groups)
          fetch(state, groups, roleGroup, roles)
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
            roleGroup: RoleGroupPayload
            roles: RolesPayload
          }>
        ) => {
          const private_groups = action.payload.groups.private_groups
          const public_groups = action.payload.groups.public_groups
          const roleGroup = action.payload.roleGroup.role_group
          const roles = action.payload.roles.roles
          state.promise = 'idle'

          const groups = public_groups.concat(private_groups)
          fetch(state, groups, roleGroup, roles)
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
        (state, action: PayloadAction<Group[]>) => {
          const groups = action.payload
          state.promise = 'idle'
          state.groups.allIds = groups.map(
            (group) => `group${group.id.toString()}`
          )

          groups.forEach((group) => {
            state.groups.byId[`group${group.id}`] = group
          })
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
  state: WritableDraft<GroupSlice>,
  groups: { id: number; name: string }[],
  roleGroup: RoleGroup[],
  roles: Role[]
) => {
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

  // Roles
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

export const {} = groupsSlice.actions

export default groupsSlice.reducer
