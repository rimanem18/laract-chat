import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import GlobalNav from './components/GlobalNav'
import Top from './components/Top'
import About from './components/About'

const App = () => {
    return(
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

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
