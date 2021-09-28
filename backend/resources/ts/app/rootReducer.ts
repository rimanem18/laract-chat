import { combineReducers } from '@reduxjs/toolkit'
import chatMessagesSlice from '../features/ChatMessagesSlice'
import userSlice from '../features/UsersSlice'

const rootReducer = combineReducers({
  chatMessagesSlice,
  userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
