import { RootState } from './store'

export const mockState: RootState = {
  authSlice: {
    name: '太郎',
    email: 'taro@example.com',
    password: 'authpassword',
    promise: 'idle',
    message: 'auth message',
  },
  chatMessagesSlice: {
    ids: ['message1', 'message2'],
    entities: {
      message1: {
        id: 1,
        name: 'hoge',
        content: 'fugafuga',
        created_at: '1900-01-01',
      },
      message2: {
        id: 2,
        name: 'piyo',
        content: 'fugafuga',
        created_at: '1900-01-01',
      },
    },
    promise: 'idle',
  },
  postSlice: {
    userId: 1,
    content: 'fugafuga',
    promise: 'idle',
  },
  userSlice: {
    id: 1,
    name: '太郎',
    email: 'taro@example.com',
    promise: 'idle',
  },
}
