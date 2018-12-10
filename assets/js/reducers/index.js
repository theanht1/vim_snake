import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './authReducer';
import app from './appReducer';
import game from './gameReducer';


export default history => combineReducers({
  router: connectRouter(history),
  app,
  auth,
  game,
});
