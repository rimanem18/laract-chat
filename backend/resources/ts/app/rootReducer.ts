import { combineReducers } from '@reduxjs/toolkit'
import authSlice from '../slices/AuthSlice'
import chatMessagesSlice from '../slices/ChatMessagesSlice'
import groupsSlice from '../slices/GroupsSlice'
import menuSlice from '../slices/MenuSlice'
import postSlice from '../slices/PostSlice'
import rolesSlice from '../slices/RolesSlice'
import userSlice from '../slices/UserSlice'

const rootReducer = combineReducers({
  authSlice,
  chatMessagesSlice,
  groupsSlice,
  menuSlice,
  postSlice,
  rolesSlice,
  userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
