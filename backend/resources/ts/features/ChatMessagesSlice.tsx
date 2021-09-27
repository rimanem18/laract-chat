import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

export type ChatMessage = {
  id: number,
  name: string,
  content: string,
  create_at: string,
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
      name: "",
      content: "",
      create_at: "0000",
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
