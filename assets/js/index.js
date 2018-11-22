import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';

// import socket from './socket'
// import 'phoenix_html';
import 'element-theme-default';
import '../css/app.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
