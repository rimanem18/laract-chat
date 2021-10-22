import {
  postContentSelector,
  postPromiseSelector,
  postUserIdSelector,
} from '../../selectors/PostSelector'
import { mockState } from '../../app/mockState'

describe('postSelector', () => {
  it('Selector で postState の値を取得できる', () => {
    const userId = postUserIdSelector(mockState)
    const content = postContentSelector(mockState)
    const promise = postPromiseSelector(mockState)

    expect(userId).toBe(1)
    expect(content).toBe('fugafuga')
    expect(promise).toBe('idle')
  })
})
