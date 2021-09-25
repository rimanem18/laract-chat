import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

type ChatMessage = {
  id: number,
  user_id: number,
  group_id: number,
  content: string,
  create_at: string,
  update_at: string
}

// 型定義
export interface ChatMessagesSliceState {
  ids: string[],
  entities: Record<string, ChatMessage>
}

// 初期値
const initialState: ChatMessagesSliceState = {
  ids: [],
  entities: {
    "message0": {
      id: 0,
      user_id: 0,
      group_id: 0,
      content: "",
      create_at: "0000",
      update_at: "0000"
    }
  }
}

export const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    getChatMessages: (state, payloadAction: PayloadAction<ChatMessage[]>) => {
      const messages = payloadAction.payload
      state.ids = messages.map(message => `message${message.id.toString()}`);

      let i = 0;
      messages.forEach(message => {
        i++;
        state.entities[`message${i}`] = message
      });
    }
  }
})

// 外部からセットできるように
export const {
  getChatMessages
} = chatMessagesSlice.actions

// 外部から読み取れるように
export const selectChatMessages = (state: RootState) =>
  state.chatMessagesSlice

export default chatMessagesSlice.reducer;
