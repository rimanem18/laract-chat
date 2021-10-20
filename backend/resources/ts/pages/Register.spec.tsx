import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Register from './Register'

const mockUseAppDispatch = jest.fn()
const mockUseAppSelector = jest.fn()
jest.mock('../app/hooks', () => ({
  useAppDispatch:
    () =>
    (...args: any[]) =>
      mockUseAppDispatch(...args),
  useAppSelector:
    () =>
    (...args: any[]) =>
      mockUseAppSelector(...args),
  useAuthPromise: () => useAuthPromiseMock(),
  useAuthMessage: () => useAuthMessageMock(),
}))

// Hooks の Mock
const useAuthPromiseMock = jest.fn().mockReturnValue('idle')
const useAuthMessageMock = jest.fn().mockReturnValue('')

const setup = () => {
  const screen = render(<Register />)
  const nameInput = screen.getByLabelText('Name') as HTMLInputElement
  const emailInput = screen.getByLabelText('Email') as HTMLInputElement
  const passwordInput = screen.getByLabelText('Password') as HTMLInputElement
  const button = screen.getByRole('button') as HTMLButtonElement
  const emailWarnMsg = screen.getByTestId('email-warning')
  const passwordWarnMsg = screen.getByTestId('password-warning')
  return {
    nameInput,
    emailInput,
    passwordInput,
    button,
    emailWarnMsg,
    passwordWarnMsg,
    ...screen,
  }
}

describe('Register Input', () => {
  it('email がメールアドレス形式ではない場合、バリデーションエラーが表示される', () => {
    const { emailInput, emailWarnMsg } = setup()

    fireEvent.change(emailInput, {
      target: { value: 'eaab' },
    })

    expect(emailWarnMsg.textContent).toEqual('Email 形式で入力してください。')
  })

  it('password の入力初期値は空', () => {
    const { passwordInput } = setup()
    expect(passwordInput.value).toEqual('')
  })

  it('password に文字を入力すると入力された文字が反映される', () => {
    const { passwordInput } = setup()
    const password = 'helloPass'
    fireEvent.change(passwordInput, {
      target: { value: password },
    })

    expect(passwordInput.value).toEqual(password)
  })

  it('password が7文字以下だとバリデーションエラーが表示される', () => {
    const { passwordInput, passwordWarnMsg } = setup()
    const password = 'hello'

    fireEvent.change(passwordInput, {
      target: { value: password },
    })

    expect(passwordWarnMsg.textContent).toEqual(
      'パスワードは8文字以上である必要があります。'
    )
  })

  it('password が8文字以上ならバリデーションエラーは表示されない', () => {
    const { passwordInput, passwordWarnMsg } = setup()
    const password = 'helloPass'

    fireEvent.change(passwordInput, {
      target: { value: password },
    })

    expect(passwordWarnMsg.textContent).toEqual('')
  })
})

describe('Register Button', () => {
  it('初期値だとボタンは押せない', () => {
    const { button } = setup()
    expect(button.disabled).toEqual(true)
  })

  it('name だけ入力されていても押せない', () => {
    const { nameInput, button } = setup()
    fireEvent.change(nameInput, {
      target: { value: '太郎' },
    })
    expect(button.disabled).toEqual(true)
  })

  it('email だけ入力されていても押せない', () => {
    const { emailInput, button } = setup()
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    })
    expect(button.disabled).toEqual(true)
  })

  it('password だけ入力されていても押せない', () => {
    const { passwordInput, button } = setup()
    fireEvent.change(passwordInput, {
      target: { value: 'helloPass' },
    })
    expect(button.disabled).toEqual(true)
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
    expect(button.disabled).toEqual(false)
  })
})
