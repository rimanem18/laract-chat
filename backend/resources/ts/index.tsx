import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import "bootstrap"
import '@fortawesome/fontawesome-free/css/all.css'

import { store } from './app/store';
import App from './pages/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
