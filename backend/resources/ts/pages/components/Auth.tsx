import axios from 'axios'
import React, { Children, useEffect, useState, useCallback, SetStateAction } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectUser,
  fetchUser,
  UserState,
  logout
} from '../../features/UserSlice'

const Auth = () => {
  // const [user, setUser] = useState<User | null>(null)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const fetchUserHandler = () => {
    dispatch(fetchUser())
  }


  const loginHandler =
    async (e: any) => {
      e.preventDefault()

      // dispatch(login({ email: email, password: password }))
      await axios.get('/sanctum/csrf-cookie').then((response) => {
        axios
          .post('/api/login', {
            email: email,
            password: password,
          })
          .then((response) => {
            console.log('[login]ログイン成功')
            fetchUserHandler();
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error.response)
            console.log('[login]ログイン失敗')
          })
      })
      // dispatch(login({email: email, passowrd: password}))

    }

  // 登録
  const register = async (e: any) => {
    e.preventDefault()

    axios
      .post('/api/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((res) => {
        console.log(res.data)
        console.log('[register]登録失敗')
      })
  }

  // ログアウト
  const logoutHandler = async () => {
    dispatch(logout())
  }

  const registerForm = (
    <form className="form" onSubmit={register}>
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
      <button className="btn btn-primary" type="submit">Register</button>
    </form>
  )

  // ログインフォーム
  let loginForm = (
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
    </form>)

  return (
    <div className="container">
      {
        user.promise === 'pending' || user.promise === 'idle' ?
          <p>通信中</p> :
          user.id === 0 ?
            <div className="row">
              <div className="col-md-6">
                <h3>ログイン</h3>
                {loginForm}
              </div>
              <div className="col-md-6">
                <h3>登録</h3>
                {registerForm}
              </div>
            </div>
            :
            <>
              <UserInfo id={user.id} name={user.name} email={user.email} promise={user.promise} />
              <div className="row mt-1">
                <button className="btn btn-primary mr-1" onClick={logoutHandler}>Logout</button>
                <button className="btn btn-primary" onClick={fetchUserHandler}>fetchUser</button>
              </div>
            </>
      }
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

export default Auth
