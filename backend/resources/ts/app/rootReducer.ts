import { combineReducers } from '@reduxjs/toolkit'
import chatMessagesSlice from '../features/ChatMessagesSlice'
import userSlice, { authApi } from '../features/UserSlice'

const rootReducer = combineReducers({
  chatMessagesSlice,
  userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
