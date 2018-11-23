import { combineReducers } from 'redux';

import auth from './authReducer';
import app from './appReducer';
import game from './gameReducer';


export default combineReducers({
  app,
  auth,
  game,
});
