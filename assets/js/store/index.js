import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import defaultState from './defaultState';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();

const middlewares = [
  thunk,
  routerMiddleware(history),
];

const store = createStore(
  createRootReducer(history),
  defaultState,
  compose(applyMiddleware(...middlewares)),
);

export default store;

