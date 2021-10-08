import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import GlobalNav from './components/GlobalNav'
import Top from './components/Top'
import About from './components/About'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchUser } from '../features/UserSlice'
import { selectAuthPromise } from '../features/AuthSlice'
import Loader from './components/Loader'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  const authPromise = useAppSelector(selectAuthPromise)
  const dispatch = useAppDispatch()

  // レンダリング時にログインしているか判定
  useEffect(() => {
    if (authPromise !== 'loading') {
      fetchUserHandler()
    }
  }, [authPromise])

  const fetchUserHandler = () => {
    dispatch(fetchUser())
  }

  return (
    <BrowserRouter>
      <React.Fragment>
        <GlobalNav />
        <Switch>
          {/*完全一致のため、exactを付与*/}
          <Route path="/" exact component={Top} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        <Loader />
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App
