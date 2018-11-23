import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import defaultState from './defaultState';
import reducers from '../reducers';

export const history = createBrowserHistory();

const store = createStore(
  reducers,
  defaultState,
  applyMiddleware(thunk)
);

export default store;

