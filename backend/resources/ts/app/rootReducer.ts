import { combineReducers } from '@reduxjs/toolkit'
import authSlice from '../features/AuthSlice'
import chatMessagesSlice from '../features/ChatMessagesSlice'
import postSlice from '../features/PostSlise'
import userSlice from '../features/UserSlice'

const rootReducer = combineReducers({
  authSlice,
  chatMessagesSlice,
  postSlice,
  userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
