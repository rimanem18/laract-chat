import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Register from '../../pages/Register'
import { BrowserRouter } from 'react-router-dom'
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
  useUserState: () => useUserStateMock(),
  useAuthState: () => useAuthStateMock(),
  useGroupsState: () => useGroupsStateMock(),
}))

// Hooks の Mock
const group = mockState.groupsSlice

const useUserStateMock = jest.fn().mockReturnValue({ id: 0 })
const useAuthStateMock = jest.fn().mockReturnValue({
  authPromise: 'idle',
  authMessage: '',
})

const useGroupsStateMock = jest.fn().mockReturnValue(group)

const setup = () => {
  const screen = render(Component)
  const nameInput = screen.getByLabelText('Name') as HTMLInputElement
  const emailInput = screen.getByLabelText('Email') as HTMLInputElement
  const passwordInput = screen.getByLabelText('Password') as HTMLInputElement
  const button = screen.getByRole('button') as HTMLButtonElement
  return {
    nameInput,
    emailInput,
    passwordInput,
    button,
    ...screen,
  }
}

const Component = (
  <BrowserRouter>
    <Register />
  </BrowserRouter>
)
describe('Register Input', () => {
  it('password の入力初期値は空', () => {
    const { passwordInput } = setup()
    expect(passwordInput.value).toBe('')
  })

  it('password に文字を入力すると入力された文字が反映される', () => {
    const { passwordInput } = setup()
    const password = 'helloPass'
    fireEvent.change(passwordInput, {
      target: { value: password },
    })

    expect(passwordInput.value).toBe(password)
  })
})

describe('Register Button', () => {
  it('初期値だとボタンは押せない', () => {
    const { button } = setup()
    expect(button.disabled).toBe(true)
  })

  it('name だけ入力されていても押せない', () => {
    const { nameInput, button } = setup()
    fireEvent.change(nameInput, {
      target: { value: '太郎' },
    })
    expect(button.disabled).toBe(true)
  })

  it('email だけ入力されていても押せない', () => {
    const { emailInput, button } = setup()
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    })
    expect(button.disabled).toBe(true)
  })

  it('password だけ入力されていても押せない', () => {
    const { passwordInput, button } = setup()
    fireEvent.change(passwordInput, {
      target: { value: 'helloPass' },
    })
    expect(button.disabled).toBe(true)
  })

  it('バリデーションにかからなくなったら押せる', () => {
    const { nameInput, emailInput, passwordInput, button } = setup()
    fireEvent.change(nameInput, {
      target: { value: '太郎' },
    })
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'helloPass' },
    })
    expect(button.disabled).toBe(false)
  })

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
