import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import axios from 'axios';

import store from './store';
import App from './components/App';
import { getCurrentUser, JWT_TOKEN_KEY } from './actions/authActions';

// import socket from './socket'
// import 'phoenix_html';
import 'element-theme-default';
import '../css/app.css';

axios.defaults.baseURL = '/api/v1';

const token = localStorage.getItem(JWT_TOKEN_KEY);
if (token) {
  store.dispatch(getCurrentUser(token));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
