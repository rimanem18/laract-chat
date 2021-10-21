import {
  authEmailSelector,
  authMessageSelector,
  authNameSelector,
  authPasswordSelector,
  authPromiseSelector,
} from './AuthSelector'
import { testState } from './selector-tests-utils'

describe('authSelector', () => {
  it('Selector で authState の値を取得できる', () => {
    const name = authNameSelector(testState)
    const email = authEmailSelector(testState)
    const password = authPasswordSelector(testState)
    const promise = authPromiseSelector(testState)
    const message = authMessageSelector(testState)

    expect(name).toBe('太郎')
    expect(email).toBe('taro@example.com')
    expect(password).toBe('authpassword')
    expect(promise).toBe('idle')
    expect(message).toBe('auth message')
  })
})
