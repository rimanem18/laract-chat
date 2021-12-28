import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import {
  useAppDispatch,
  useAuthState,
  useRolesState,
  useUserState,
} from './app/hooks'
import { fetchUser } from './slices/UserSlice'

import Top from './pages/Top'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthRedirect from './components/AuthRedirect'
import { fetchRoles } from './slices/RolesSlice'

const App = () => {
  const authState = useAuthState()
  const userState = useUserState()
  const rolesState = useRolesState()
  const dispatch = useAppDispatch()

  // レンダリング時にログインしているか判定
  useEffect(() => {
    if (authState.promise !== 'loading') {
      dispatch(fetchUser({ userId: userState.id }))
    }
  }, [authState.promise, userState.id])

  useEffect(() => {
    if (rolesState.promise !== 'loading') {
      dispatch(fetchRoles())
    }
  }, [])

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
