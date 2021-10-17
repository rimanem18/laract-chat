import { PayloadAction } from '@reduxjs/toolkit'
import { addMessages, ChatMessage, chatMessagesSlice, ChatMessagesSliceState, fetchMessages } from './ChatMessagesSlice'

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
      expect(state.promise).toEqual("loading")
    })
    it('fetchMessages fulfilled 配列が一個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: fetchMessages.fulfilled.type,
        payload: [{
          id: 1,
          name: "hoge",
          content: "Hello World!",
          created_at: "1900-01-01"
        }
        ]
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toEqual("idle")
    })
    it('fetchMessages fulfilled 配列が複数個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: fetchMessages.fulfilled.type,
        payload: [
          {
            id: 1,
            name: "hoge",
            content: "Hello World!",
            created_at: "1900-01-01"
          },
          {
            id: 2,
            name: "fuga",
            content: "Hello Docker",
            created_at: "1900-01-01"
          },
        ]
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toEqual("idle")
    })
    it('fetchMessages rejected', () => {
      const action = {
        type: fetchMessages.rejected.type,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toEqual("rejected")
    })
  })

  describe('addMessages', () => {
    it('addMessages pending', () => {
      const action = {
        type: addMessages.pending.type,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toEqual("loading")
    })
    it('addMessages fulfilled 配列が一個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: addMessages.fulfilled.type,
        payload: [{
          id: 1,
          name: "hoge",
          content: "Hello World!",
          created_at: "1900-01-01"
        }]
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toEqual("idle")
    })
    it('addMessages fulfilled 配列が複数個', () => {
      const action: PayloadAction<ChatMessage[]> = {
        type: addMessages.fulfilled.type,
        payload: [
          {
            id: 1,
            name: "hoge",
            content: "Hello World!",
            created_at: "1900-01-01"
          },
          {
            id: 2,
            name: "fuga",
            content: "Hello Docker",
            created_at: "1900-01-01"
          },
        ]
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toEqual("idle")
    })
    it('addMessages rejected', () => {
      const action = {
        type: addMessages.rejected.type,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toEqual("rejected")
    })
  })
})

