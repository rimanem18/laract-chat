import React from 'react';
import "bootstrap"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalNav from './components/GlobalNav'
import Top from './components/Top'
import About from './components/About'

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <GlobalNav />
        <Switch>
          {/*完全一致のため、exactを付与*/}
          <Route path="/" exact component={Top} />
          <Route path="/about" component={About} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}


export default App
