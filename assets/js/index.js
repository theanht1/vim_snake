import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';

import store, { history } from './store';
import App from './components/App';
import { getCurrentUser, JWT_TOKEN_KEY } from './actions/authActions';

import 'element-theme-default';
import '../css/app.css';

axios.defaults.baseURL = '/api/v1';

const token = localStorage.getItem(JWT_TOKEN_KEY);
if (token) {
  store.dispatch(getCurrentUser(token));
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
