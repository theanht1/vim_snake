import axios from 'axios';

import { SET_SCORE_SUBMITTING } from '../reducers/gameReducer';
import { SET_USER } from '../reducers/authReducer';


export const updateScore = highscore => dispatch => {
  dispatch({ type: SET_SCORE_SUBMITTING, payload: true });
  return axios.post('/highscore', { user: { highscore } })
    .then(({ data: { user: { highscore } } }) => {
      console.log(highscore)
      dispatch({ type: SET_USER, payload: { highscore } });
      dispatch({ type: SET_SCORE_SUBMITTING, payload: false });
    }, (err) => {
      dispatch({ type: SET_SCORE_SUBMITTING, payload: false });
      console.log(err);
    });
};

