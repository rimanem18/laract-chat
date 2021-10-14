import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { register } from '../../features/AuthSlice'
import Input from './Input'

const Register = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(true)
  const [password, setPassword] = useState('')

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

  return (
    <div className="container">
      <h3>登録</h3>
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <div data-testid="email-warning">
          {emailError ? <p>Email 形式で入力してください。</p> : ''}
        </div>
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div data-testid="password-warning">
          {password.length === 0 ? (
            <p>パスワードを入力してください。</p>
          ) : password.length <= 7 ? (
            <p>パスワードは8文字以上である必要があります。</p>
          ) : (
            ''
          )}
        </div>
        <button
          disabled={
            name.length === 0 ||
            email.length === 0 ||
            emailError ||
            password.length <= 7
              ? true
              : false
          }
          className="btn btn-primary"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
