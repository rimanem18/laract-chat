import axios from 'axios'
import React, { useEffect, useState } from 'react'

type User = {
  name: string
  email: string
  password: string
}

const Auth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ブラウザリロード時にログイン済みか判定
  useEffect(() => {
    getUser()
  }, [user === null])

  const getUser = () => {
    axios
      .get('/api/user')
      .then((res) => {
        console.log('[getUser]ログイン済み')
        console.log(res.data)
        setUser(res.data)
      })
      .catch((err) => {
        console.log('[getUser]ログインしていません')
      })
  }

  const login = async (e: any) => {
    e.preventDefault()

    // ログイン時に CSRF トークンを初期化
    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios
        .post('/api/login', {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.response)
          console.log('[login]ログイン失敗')
        })
    })
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
        setUser(null)
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
    <form onSubmit={login}>
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
      <button type="submit">Login</button>
    </form>
  )

  //  ユーザ情報
  let userInfo = null

  // 認証済みの場合、ログアウトボタンとユーザ情報を表示
  if (user !== null) {
    form = <button onClick={logout}>Logout</button>
    userInfo = (
      <div>
        <h2>User</h2>
        <div>name: {user.name}</div>
        <div>email: {user.email}</div>
      </div>
    )
  }

  return (
    <div>
      {form}
      {userInfo}
      <button onClick={getUser}>getUser</button>
      {registerForm}
    </div>
  )
}

export default Auth
