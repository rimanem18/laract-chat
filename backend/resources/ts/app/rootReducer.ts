import { combineReducers } from '@reduxjs/toolkit'
import authSlice from '../slices/AuthSlice'
import chatMessagesSlice from '../slices/ChatMessagesSlice'
import groupsSlice from '../slices/GroupsSlice'
import postSlice from '../slices/PostSlice'
import userSlice from '../slices/UserSlice'

const rootReducer = combineReducers({
  authSlice,
  chatMessagesSlice,
  groupsSlice,
  postSlice,
  userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
