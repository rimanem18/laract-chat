import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Login from './Login'

jest.mock('../../features/AuthSlice')
jest.mock('../../app/hooks')

describe('Login', () => {
  it('email の入力初期値は空', () => {
    const screen = render(<Login />)
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    expect(emailInput.value).toEqual('')
  })

  it('email に文字を入力すると入力された文字が反映される', () => {
    const screen = render(<Login />)
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const email = 'test@example.com'
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: email },
    })

    screen.debug()
    expect(emailInput.value).toEqual(email)
  })
})
