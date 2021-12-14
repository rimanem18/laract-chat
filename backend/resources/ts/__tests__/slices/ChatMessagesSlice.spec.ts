import { PayloadAction } from '@reduxjs/toolkit'
import {
  Message,
  MessagePayload,
  PromiseState,
  RoleUser,
  RoleUserPayload,
} from '../../app/type'
import {
  chatMessagesSlice,
  fetchMessages,
} from '../../slices/ChatMessagesSlice'

type ChatMessagesState = {
  messages: {
    byId: Record<string, Message>
    allIds: string[]
  }
  roleUser: {
    byId: Record<string, RoleUser>
    allIds: string[]
  }
  promise: PromiseState
}

const initialState: ChatMessagesState = {
  messages: {
    byId: {},
    allIds: [],
  },
  roleUser: {
    byId: {},
    allIds: [],
  },
  promise: 'idle',
}

const messagePayloadMock: MessagePayload[] = [
  {
    id: 1,
    name: 'hoge',
    group_id: 1,
    content: 'Hello World!',
    created_at: '1900-01-01',
    user_id: 1,
  },
  {
    id: 2,
    name: 'fuga',
    group_id: 2,
    content: 'Hello Docker',
    created_at: '1900-01-01',
    user_id: 2,
  },
]
const roleUserPayloadMock: RoleUserPayload = {
  role_user: [{ user_id: 1, role_id: 1 }],
}
const payloadMock = {
  messages: messagePayloadMock,
  role_user: roleUserPayloadMock,
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
    it('fetchMessages fulfilled', () => {
      const action = {
        type: fetchMessages.fulfilled.type,
        payload: payloadMock,
      }
      const state = chatMessagesSlice.reducer(initialState, action)
      expect(state.messages.allIds)
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
})
