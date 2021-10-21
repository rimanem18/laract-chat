import { combineReducers } from '@reduxjs/toolkit'
import authSlice from '../slices/AuthSlice'
import chatMessagesSlice from '../slices/ChatMessagesSlice'
import postSlice from '../slices/PostSlice'
import userSlice from '../slices/UserSlice'

const rootReducer = combineReducers({
  authSlice,
  chatMessagesSlice,
  postSlice,
  userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
