import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Login from '../../pages/Login'

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
  useAuthPromise: () => useAuthPromiseMock(),
}))

// Hooks の Mock
const useAuthPromiseMock = jest.fn().mockReturnValue('idle')

const setup = () => {
  const screen = render(<Login />)
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

describe('Login', () => {
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
    const tree = renderer.create(<Login />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})