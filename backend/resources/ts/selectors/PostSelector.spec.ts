import {
  postContentSelector,
  postPromiseSelector,
  postUserIdSelector,
} from './PostSelector'
import { testState } from './selector-tests-utils'

describe('postSelector', () => {
  it('Selector で postState の値を取得できる', () => {
    const userId = postUserIdSelector(testState)
    const content = postContentSelector(testState)
    const promise = postPromiseSelector(testState)

    expect(userId).toBe(1)
    expect(content).toBe('fugafuga')
    expect(promise).toBe('idle')
  })
})
