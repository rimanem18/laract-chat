import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { useAppDispatch, useAuthPromise } from './app/hooks'
import { fetchUser } from './slices/UserSlice'

import GlobalNav from './components/GlobalNav'
import Top from './pages/Top'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const authPromise = useAuthPromise()
  const dispatch = useAppDispatch()

  // レンダリング時にログインしているか判定
  useEffect(() => {
    if (authPromise !== 'loading') {
      dispatch(fetchUser())
    }
  }, [authPromise])

  return (
    <BrowserRouter>
      <React.Fragment>
        <GlobalNav />
        <Switch>
          {/*完全一致のため、exactを付与*/}
          <Route path="/groups/:groupId" exact component={Top} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        {/* <Loader /> */}
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App
