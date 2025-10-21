import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { createBrowserHistory } from "history";

import defaultState from "./defaultState";
import rootReducer from "../reducers";

// Create browser history for navigation from Redux actions
export const history = createBrowserHistory();

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  defaultState,
  compose(applyMiddleware(...middlewares))
);

export default store;
