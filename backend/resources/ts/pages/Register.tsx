import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAuthState, useUserState } from '../app/hooks'
import { initAuthState, register } from '../slices/AuthSlice'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import AuthRedirect from '../components/AuthRedirect'
import { Button, Grid } from '@mui/material'

const Register = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(true)
  const [password, setPassword] = useState('')
  const { authMessage, authPromise } = useAuthState()
  const UserState = useUserState()

  // 登録
  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      register({
        name: name,
        email: email,
        password: password,
      })
    )
  }

  // Email の正規表現にマッチするかチェック
  const EmailRegexp =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  useEffect(() => {
    if (email.match(EmailRegexp)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }, [email])

  useEffect(() => {
    dispatch(initAuthState())
  }, [])

  return (
    <>
      {UserState.id !== 0 ? (
        <AuthRedirect />
      ) : (
        <Grid container spacing={10}>
          <Grid item xs={2} md={3}></Grid>
          <Grid item xs={8} md={6}>
            <h3>登録</h3>
            <p>
              {authPromise === 'rejected'
                ? `ユーザ登録に失敗しました。${authMessage}`
                : ''}
            </p>

            <form className="form" onSubmit={registerHandler}>
              <Input
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="name-input"
              />
              <Input
                label="Email"
                type="text"
                name="email"
                value={email}
                helperText={emailError ? 'Email 形式で入力してください。' : ''}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                helperText={
                  password.length === 0
                    ? 'パスワードを入力してください。'
                    : password.length <= 7
                    ? 'パスワードは8文字以上である必要があります。'
                    : ''
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                disabled={
                  name.length === 0 ||
                  email.length === 0 ||
                  emailError ||
                  password.length <= 7
                    ? true
                    : false
                }
                type="submit"
              >
                Register
              </Button>
            </form>
            <div className="mt-1">
              <p>
                すでに登録済みの方は<Link to="/login">ログイン</Link>
              </p>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Register
