import * as React from 'react'
import * as ReactDOM from 'react-dom'

// import React from 'react';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';
import css from '../css/app.css';

// import socket from './socket'
import 'phoenix_html';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
