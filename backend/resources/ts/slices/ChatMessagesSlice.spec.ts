import { PayloadAction } from '@reduxjs/toolkit'
import {
  ChatMessage,
  chatMessagesSlice,
  ChatMessagesSliceState,
  fetchMessages,
  updateMessages,
} from './ChatMessagesSlice'

// 初期値
const initialState: ChatMessagesSliceState = {
  ids: [],
  entities: {
    message0: {
      id: 0,
      name: '',
      content: '',
      created_at: '',
    },
  },
  promise: 'idle',
}

describe('ChatMessages', () => {
  describe('fetchMessages', () => {
    it('fetch pending', () => {
      const action = {
        type: fetchMessages.pending.type,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('fetchMessages fulfilled 配列が一個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: fetchMessages.fulfilled.type,
        payload: [
          {
            id: 1,
            name: 'hoge',
            content: 'Hello World!',
            created_at: '1900-01-01',
          },
        ],
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('fetchMessages fulfilled 配列が複数個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: fetchMessages.fulfilled.type,
        payload: [
          {
            id: 1,
            name: 'hoge',
            content: 'Hello World!',
            created_at: '1900-01-01',
          },
          {
            id: 2,
            name: 'fuga',
            content: 'Hello Docker',
            created_at: '1900-01-01',
          },
        ],
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('fetchMessages rejected', () => {
      const action = {
        type: fetchMessages.rejected.type,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })

  describe('updateMessages', () => {
    it('updateMessages pending', () => {
      const action = {
        type: updateMessages.pending.type,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('updateMessages fulfilled 配列が一個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: updateMessages.fulfilled.type,
        payload: [
          {
            id: 1,
            name: 'hoge',
            content: 'Hello World!',
            created_at: '1900-01-01',
          },
        ],
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('updateMessages fulfilled 配列が複数個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: updateMessages.fulfilled.type,
        payload: [
          {
            id: 1,
            name: 'hoge',
            content: 'Hello World!',
            created_at: '1900-01-01',
          },
          {
            id: 2,
            name: 'fuga',
            content: 'Hello Docker',
            created_at: '1900-01-01',
          },
        ],
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('updateMessages rejected', () => {
      const action = {
        type: updateMessages.rejected.type,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })
})
