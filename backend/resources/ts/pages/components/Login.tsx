import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../features/AuthSlice'
import Input from './Input'
import LoginForm from './LoginForm'

const Login = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      login({
        email: email,
        password: password,
      })
    )
  }

  return (
    <div className="container">
      <h3>ログイン</h3>
      <LoginForm loginHandler={loginHandler} />
    </div>
  )
}


export default Login
