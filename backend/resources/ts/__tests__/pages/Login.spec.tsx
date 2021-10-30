import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import Login from '../../pages/Login'
import { mockState } from '../../app/mockState'

const mockUseAppDispatch = jest.fn()
const mockUseAppSelector = jest.fn()
jest.mock('../../app/hooks', () => ({
  useAppDispatch:
    () =>
    (...args: any[]) =>
      mockUseAppDispatch(...args),
  useAppSelector:
    () =>
    (...args: any[]) =>
      mockUseAppSelector(...args),
  useUserId: () => useUserIdMock(),
  useAuthPromise: () => useAuthPromiseMock(),
}))

// State の Mock
const user = mockState.userSlice

// Hooks の Mock
let useUserIdMock = jest.fn().mockReturnValue(user.id)
const useAuthPromiseMock = jest.fn().mockReturnValue('idle')

const Component = (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
)
const setup = () => {
  const screen = render(Component)
  const emailInput = screen.getByLabelText('Email') as HTMLInputElement
  const passwordInput = screen.getByLabelText('Password') as HTMLInputElement
  const button = screen.getByRole('button') as HTMLButtonElement
  return {
    emailInput,
    passwordInput,
    button,
    ...screen,
  }
}

describe('未ログイン時 Login', () => {
  beforeAll(() => {
    useUserIdMock = jest.fn().mockReturnValue(0)
  })

  it('email の入力初期値は空', () => {
    const { emailInput } = setup()
    expect(emailInput.value).toBe('')
  })

  it('email に文字を入力すると入力された文字が反映される', () => {
    const { emailInput } = setup()
    const email = 'test@example.com'
    fireEvent.change(emailInput, {
      target: { value: email },
    })
    expect(emailInput.value).toBe(email)
  })

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
