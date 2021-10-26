import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAuthPromise } from '../app/hooks'
import { initAuthState, login } from '../slices/AuthSlice'
import Input from '../components/Input'

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

  const emailChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    []
  )
  const passwordChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    },
    []
  )

  return (
    <>
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
          onChange={emailChangeHandler}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </>
  )
}

export default React.memo(Login)
