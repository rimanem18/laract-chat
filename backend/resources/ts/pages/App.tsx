import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalNav from './components/GlobalNav'
import Top from './components/Top'
import About from './components/About'
import Auth from './components/Auth'

const App = () => {
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
