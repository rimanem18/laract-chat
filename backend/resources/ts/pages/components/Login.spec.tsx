import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { mount, shallow } from 'enzyme'
import Login from './Login'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AuthState, login } from '../../features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import Input from './Input'

jest.mock('../../features/AuthSlice')
jest.mock('../../app/hooks')

const useDispatchMock = useAppDispatch as jest.Mock

describe('Login', () => {

  it('ログインボタンを押すとログイン処理が発火する', () => {
    const mockLoginHandler = jest.fn()
    const { getByTestId } = render(<LoginForm loginHandler={mockLoginHandler} />)

    fireEvent.click(getByTestId('login-btn'))
    expect(mockLoginHandler).toHaveBeenCalled()
  })

  it('入力した値がフォームに反映される', () => {
    const mockSetEmail = jest.fn()
    const email = "test@example.com"

    const { getByTestId } = render(<Input
      label="Email"
      type="text"
      name="email"
      value={email}
      onChange={(e) => mockSetEmail(e.target.value)}
    />)

    fireEvent.change(input, { target: { value: email } })
    expect(getByTestId('input')).toEqual(email)
  })
})
