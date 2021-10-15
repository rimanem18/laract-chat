import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Login from './Login'

jest.mock('../../features/AuthSlice')
jest.mock('../../app/hooks')

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
    expect(emailInput.value).toEqual('')
  })

  it('email に文字を入力すると入力された文字が反映される', () => {
    const { emailInput } = setup()
    const email = 'test@example.com'
    fireEvent.change(emailInput, {
      target: { value: email },
    })
    expect(emailInput.value).toEqual(email)
  })
})
