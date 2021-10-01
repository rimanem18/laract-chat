import axios from 'axios'
import React, { Children, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectUser,
  login,
  setUser,
  useLoginMutation,
} from '../../features/UserSlice'

type User = {
  name: string
  email: string
  password: string
}

const Auth = () => {
  // const [user, setUser] = useState<User | null>(null)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ブラウザリロード時にログイン済みか判定
  useEffect(() => {
    fetchUser()
  }, [user.id])

  const fetchUser = async () => {
    const res = await axios.get('/api/user')
    console.log(res.data.name)

    dispatch(
      setUser({
        id: res.data.id,
        email: res.data.email,
        name: res.data.name,
      })
    )
  }

  const [login, { isLoading, isError }] = useLoginMutation()

  const loginHandler = async () => {
    const data = {
      email: email,
      password: password,
    }
    const res = await login(data)
      .unwrap()
      .then((res) => alert('ログイン成功'))
      .catch((err) => alert('ログイン失敗'))
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
  const logout = () => {
    axios
      .get('/api/logout')
      .then((res) => {
        // dispatch(setUser({ id: 0, name: '', email: '' }))
        console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let registerForm = (
    <form onSubmit={register}>
      <label htmlFor="name">name</label>
      <input
        type="name"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  )

  // ログインフォーム
  let form = (
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
      <button onClick={logout}>Logout</button>
    </form>
  )

  //  ユーザ情報
  let userInfo = null

  // 認証済みの場合、ログアウトボタンとユーザ情報を表示
  if (user.id !== 0) {
    form = <button onClick={logout}>Logout</button>
    userInfo = (
      <div>
        <h2>User</h2>
        <div>name: {user.name}</div>
        <div>email: {user.email}</div>
      </div>
    )
  }

  console.log(user)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {form}
          {userInfo}
        </div>
        {/* <div className="col-md-6">
          <button onClick={getUser}>getUser</button>
          {registerForm}
        </div> */}
      </div>
      <div>
        <h2>User</h2>
        <div>name: {user.name}</div>
        <div>email: {user.email}</div>
      </div>
    </div>
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
