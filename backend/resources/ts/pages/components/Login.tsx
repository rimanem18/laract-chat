import React, { useEffect, useState } from 'react'
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
      <div className="form">
        <Input
          label="Email"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={loginHandler}
          className="btn btn-primary"
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
