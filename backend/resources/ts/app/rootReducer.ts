import { combineReducers } from '@reduxjs/toolkit'
import chatMessagesSlice from '../features/ChatMessagesSlice'
import postSlice from '../features/PostSlise'
import userSlice from '../features/UserSlice'

const rootReducer = combineReducers({
  chatMessagesSlice,
  postSlice,
  userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
