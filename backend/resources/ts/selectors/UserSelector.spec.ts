import { testState } from './selector-tests-utils'
import {
  userEmailSelector,
  userIdSelector,
  userNameSelector,
  userPromiseSelector,
} from './UserSelector'

describe('userSelector', () => {
  it('Selector で userState の値を取得できる', () => {
    const id = userIdSelector(testState)
    const name = userNameSelector(testState)
    const email = userEmailSelector(testState)
    const promise = userPromiseSelector(testState)

    expect(id).toBe(1)
    expect(name).toBe('太郎')
    expect(email).toBe('taro@example.com')
    expect(promise).toBe('idle')
  })
})
