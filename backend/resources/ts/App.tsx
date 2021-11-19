import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { useAppDispatch, useAuthState } from './app/hooks'
import { fetchUser } from './slices/UserSlice'

import Top from './pages/Top'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthRedirect from './components/AuthRedirect'

const App = () => {
  const { authPromise } = useAuthState()
  const dispatch = useAppDispatch()

  console.log('App')

  // レンダリング時にログインしているか判定
  useEffect(() => {
    if (authPromise !== 'loading') {
      dispatch(fetchUser())
    }
  }, [authPromise])

  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/groups/:groupId" exact component={Top} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthRedirect />
        </Switch>
        {/* <Loader /> */}
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App
