import { PostState } from '../../app/type'
import { postSlice, postMessage, getContent } from '../../slices/PostSlice'

const initialState: PostState = {
  userId: 0,
  content: '',
  promise: 'idle',
}

describe('postSlice', () => {
  describe('reducer', () => {
    it('getContent', () => {
      const action = {
        type: getContent.type,
        payload: 'Hello World!',
      }
      const state = postSlice.reducer(initialState, action)
      expect(state.content).toBe('Hello World!')
    })
  })

  describe('extraReducer', () => {
    it('postMessage pending', () => {
      const action = {
        type: postMessage.pending.type,
      }
      const state = postSlice.reducer(initialState, action)
      expect(state.promise).toBe('loading')
    })
    it('postMessage fulfilled', () => {
      const action = {
        type: postMessage.fulfilled.type,
      }
      const state = postSlice.reducer(initialState, action)
      expect(state.promise).toBe('idle')
      expect(state.content).toBe('')
    })
    it('postMessage rejected', () => {
      const action = {
        type: postMessage.rejected.type,
      }
      const state = postSlice.reducer(initialState, action)
      expect(state.promise).toBe('rejected')
    })
  })
})
