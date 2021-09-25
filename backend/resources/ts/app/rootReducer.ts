import { combineReducers } from '@reduxjs/toolkit';
import chatMessagesSlice from '../features/ChatMessagesSlice';

const rootReducer = combineReducers({
  chatMessagesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
