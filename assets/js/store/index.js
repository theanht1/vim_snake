import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import defaultState from './defaultState';
import reducers from '../reducers';


const store = createStore(
  reducers,
  defaultState,
  applyMiddleware(thunk)
);

export default store;

