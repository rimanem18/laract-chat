import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAuthState } from '../app/hooks'
import { initAuthState, login } from '../slices/AuthSlice'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import AuthRedirect from '../components/AuthRedirect'
import { Button, Grid } from '@mui/material'

const Login = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authPromise } = useAuthState()

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      login({
        email: email,
        password: password,
      })
    )
  }

  const demoLoginHandler = () => {
    setEmail('demo@example.com')
    setPassword('cX3/ZNa-')
    dispatch(
      login({
        email: 'demo@example.com',
        password: 'cX3/ZNa-',
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
      <Grid container spacing={10}>
        <Grid item xs={2} md={3}></Grid>
        <Grid item xs={8} md={6}>
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
            <Button variant="contained" data-testid="login-btn" type="submit">
              Login
            </Button>
          </form>
          <div className="mt-1">
            <p>
              ユーザ登録がまだの場合は<Link to="/register">登録</Link>
            </p>
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={demoLoginHandler}
          >
            デモユーザーとしてログイン
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default React.memo(Login)
