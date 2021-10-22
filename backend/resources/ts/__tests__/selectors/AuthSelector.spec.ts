import {
  authEmailSelector,
  authMessageSelector,
  authNameSelector,
  authPasswordSelector,
  authPromiseSelector,
} from '../../selectors/AuthSelector'
import { mockState } from '../../app/mockState'

describe('authSelector', () => {
  it('Selector で authState の値を取得できる', () => {
    const name = authNameSelector(mockState)
    const email = authEmailSelector(mockState)
    const password = authPasswordSelector(mockState)
    const promise = authPromiseSelector(mockState)
    const message = authMessageSelector(mockState)

    expect(name).toBe('太郎')
    expect(email).toBe('taro@example.com')
    expect(password).toBe('authpassword')
    expect(promise).toBe('idle')
    expect(message).toBe('auth message')
  })
})
