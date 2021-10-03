import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalNav from './components/GlobalNav'
import Top from './components/Top'
import About from './components/About'
import Auth from './components/Auth'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser, selectUser } from '../features/UserSlice';
import { selectAuth } from '../features/AuthSlice';

const App = () => {
  const user = useAppSelector(selectUser)
  const auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  // レンダリング時にログインしているか判定
  useEffect(() => {
    if (auth.promise !== 'loading') {
      fetchUserHandler()
    }
  }, [auth.promise])

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
          <Route path="/auth" component={Auth} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}


export default App
