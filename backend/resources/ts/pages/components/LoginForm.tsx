import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../features/AuthSlice'
import Input from './Input'


type LoginFormProps = {
  loginHandler: (e: React.MouseEvent<HTMLButtonElement>) => void

}
const LoginForm = ({ loginHandler }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
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
      <button onClick={loginHandler} data-testid="login-btn" className="login btn btn-primary" type="submit">
        Login
      </button>
    </div>
  )
}


export default LoginForm
