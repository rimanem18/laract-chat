import React, { useCallback, useEffect, useState } from 'react'
import {
  useAppDispatch,
  useAuthPromise,
  useGroupsOldestId,
  useUserId,
} from '../app/hooks'
import { initAuthState, login } from '../slices/AuthSlice'
import Input from '../components/Input'
import { Link, Redirect } from 'react-router-dom'
import AuthRedirect from '../components/AuthRedirect'

const initialState = null
const Login = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authPromise = useAuthPromise()
  const userId = useUserId()
  const oldestGroupsId = useGroupsOldestId()

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
      <AuthRedirect />
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
        <div className="mt-1">
          <p>
            ユーザ登録がまだの場合は<Link to="/register">登録</Link>
          </p>
        </div>
      </>
    </>
  )
}

export default React.memo(Login)
