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

// enzyme
describe('login button', () => {
  test('test btn', () => {
    const testHandler = jest.fn()
    const { getByText } = render(<Login />)
    fireEvent.click(getByText('テストボタン'))
    expect(testHandler).toHaveBeenCalled()
  })
})

// @testing-library/react
// describe('click login button', () => {
//   test('onClick', () => {
//     const LoginHandler = jest.fn()
//     const { getByText } = render(
//       <form className="form" onSubmit={LoginHandler}>
//         <button className="login btn btn-primary" type="submit">
//           Login
//         </button>
//       </form>
//     )
//     fireEvent.click(getByText('Login'))
//     expect(LoginHandler).toHaveBeenCalledTimes(1)
//   })
// })
