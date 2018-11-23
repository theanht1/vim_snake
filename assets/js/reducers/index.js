import { combineReducers } from 'redux';

import auth from './authReducer';
import app from './appReducer';


export default combineReducers({
  app,
  auth,
});
