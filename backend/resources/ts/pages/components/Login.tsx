import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useAuthPromise } from '../../app/hooks'
import { initAuthState, login } from '../../features/AuthSlice'
import Input from './Input'

const Login = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authPromise = useAuthPromise()

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      login({
        email: email,
        password: password,
      })
    )
  }

  useEffect(() => {
    dispatch(initAuthState())
  }, [])

  return (
    <div className="container">
      <h3>ログイン</h3>
      <p>
        {authPromise === 'rejected'
          ? 'ログインに失敗しました。ユーザ名とパスワードが正しいか確認してください。'
          : ''}
      </p>
      <form className="form" onSubmit={loginHandler}>
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
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default React.memo(Login)
