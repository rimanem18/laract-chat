import { PayloadAction } from '@reduxjs/toolkit'
import { MessagePayload } from '../../app/type'
import {
  chatMessagesSlice,
  ChatMessagesSliceState,
  fetchMessages,
  updateMessages,
} from '../../slices/ChatMessagesSlice'

// 初期値
const initialState: ChatMessagesSliceState = {
  ids: [],
  entities: {
    message0: {
      id: 0,
      group_id: 0,
      name: '',
      content: '',
      created_at: '',
      role_name: '',
      role_color: '',
    },
  },
  promise: 'idle',
}

const payloadMock: MessagePayload[] = [
  {
    id: 1,
    name: 'hoge',
    group_id: 1,
    content: 'Hello World!',
    created_at: '1900-01-01',
    roles: [
      {
        id: 3,
        name: 'staff',
        color: '#999999',
      },
    ],
  },
  {
    id: 2,
    name: 'fuga',
    group_id: 2,
    content: 'Hello Docker',
    created_at: '1900-01-01',
    roles: [
      {
        id: 3,
        name: 'staff',
        color: '#999999',
      },
    ],
  },
]

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
      const action: PayloadAction<MessagePayload[]> = {
        type: fetchMessages.fulfilled.type,
        payload: [payloadMock[0]],
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('fetchMessages fulfilled 配列が複数個', () => {
      const action: PayloadAction<MessagePayload[]> = {
        type: fetchMessages.fulfilled.type,
        payload: payloadMock,
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
      const action: PayloadAction<MessagePayload[]> = {
        type: updateMessages.fulfilled.type,
        payload: [payloadMock[0]],
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
    })
    it('updateMessages fulfilled 配列が複数個', () => {
      const action: PayloadAction<MessagePayload[]> = {
        type: updateMessages.fulfilled.type,
        payload: payloadMock,
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
