import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  login,
  logout,
  register,
  selectAuthPromise,
} from '../../features/AuthSlice'
import { selectUser, fetchUser, UserState } from '../../features/UserSlice'

const Register = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authPromise = useAppSelector(selectAuthPromise)

  const fetchUserHandler = () => {
    dispatch(fetchUser())
  }

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

  const registerForm = (
    <form className="form" onSubmit={registerHandler}>
      <Input
        label="Name"
        type="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        Register
      </button>
    </form>
  )

  return (
    <div className="container">
      <h3>登録</h3>
      {registerForm}
    </div>
  )
}

/**
 * Componemts
 */
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

export default Register
