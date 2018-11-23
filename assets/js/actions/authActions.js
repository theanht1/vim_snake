import axios from 'axios';

import { SET_USER, SET_LOGIN_LOADING } from '../reducers/authReducer';
import { SET_APP_LOADING } from '../reducers/appReducer';
import { history } from '../store';
import defaultState from '../store/defaultState';

export const JWT_TOKEN_KEY = 'JWT_TOKEN';

const setAccessToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem(JWT_TOKEN_KEY, token);
}

const removeAccessToken = () => {
  axios.defaults.headers.common.Authorization = '';
  localStorage.removeItem(JWT_TOKEN_KEY);
};

export const login = () => dispatch => {
  global.gapi.load('auth2', () => {
    const GoogleAuth = global.gapi.auth2.init();
    GoogleAuth.signIn()
      .then((res) => {
        const id_token = res.getAuthResponse().id_token;

        dispatch({ type: SET_LOGIN_LOADING, payload: true });
        return axios.post('/login', { user: { id_token } })
          .then(({ data: { jwt, user } }) => {
            setAccessToken(jwt);
            dispatch({ type: SET_USER, payload: user });
            dispatch({ type: SET_LOGIN_LOADING, payload: false });
            history.push('/play');
          }, (err) => {
            dispatch({ type: SET_LOGIN_LOADING, payload: false });
            console.log(err);
          });
      });
  });
};

export const getCurrentUser = token => dispatch => {
  dispatch({ type: SET_APP_LOADING, payload: true });
  setAccessToken(token);
  return axios.post('/me')
    .then(({ data: { user } }) => {
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_APP_LOADING, payload: false });
    }, (err) => {
      removeAccessToken();
      dispatch({ type: SET_APP_LOADING, payload: false });
      console.log(err);
    });
};

export const logout = () => dispatch => {
  removeAccessToken();
  dispatch({ type: SET_USER, payload: defaultState.auth.currentUser });
  history.push('/login');
};
