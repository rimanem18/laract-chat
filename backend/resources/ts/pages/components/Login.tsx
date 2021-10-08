import axios from 'axios'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, logout, register } from '../../features/AuthSlice'
import { selectUser, fetchUser, UserState } from '../../features/UserSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('ここにメッセージ')

  const fetchUserHandler = () => {
    dispatch(fetchUser())
  }

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('ログイン中です')
    dispatch(
      login({
        email: email,
        password: password,
      })
    )
  }

  // ログアウト
  const logoutHandler = () => {
    setMessage('ログアウトしています')
    dispatch(logout())
  }

  // ログインフォーム
  const loginForm = (
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
  )

  return (
    <div className="container">
      {user.promise === 'loading' || user.id === 0 ? (
        <>
          <h3>ログイン</h3>
          {loginForm}
        </>
      ) : (
        <>
          <UserInfo
            id={user.id}
            name={user.name}
            email={user.email}
            promise={user.promise}
          />
          <div className="row mt-1">
            <button className="btn btn-primary mr-1" onClick={logoutHandler}>
              Logout
            </button>
            <button className="btn btn-primary" onClick={fetchUserHandler}>
              fetchUser
            </button>
          </div>
        </>
      )}
    </div>
  )
}

/**
 * Componemts
 */

const UserInfo = ({ id, name, email, promise }: UserState) => {
  return (
    <>
      <div>
        <h2>User</h2>
        <div>name: {id}</div>
        <div>name: {name}</div>
        <div>email: {email}</div>
      </div>
    </>
  )
}

type InputProps = {
  label: string
  type: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
const Input = ({ label, type, name, value, onChange }: InputProps) => {
  return (
    <>
      <div className="form-group">
        <label className="form-label">{label}</label>
        <input
          className="form-control"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default Login
