import axios from 'axios';
import { push } from 'connected-react-router';

import { SET_USER, SET_LOGIN_LOADING } from '../reducers/authReducer';
import { SET_APP_LOADING } from '../reducers/appReducer';
import defaultState from '../store/defaultState';
import { showNotification } from '../utils';

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
  global.FB.login(res => {
    if (res.status !== 'connected') {
      console.log('User not connect to app');
      return;
    }

    const { authResponse: { accessToken } } = res;
    dispatch({ type: SET_LOGIN_LOADING, payload: true });
    return axios.post('/login', { user: { token: accessToken } })
      .then(({ data: { jwt, user } }) => {
        setAccessToken(jwt);
        dispatch({ type: SET_USER, payload: user });
        dispatch({ type: SET_LOGIN_LOADING, payload: false });
        dispatch(push('/play'));
      }, (err) => {
        dispatch({ type: SET_LOGIN_LOADING, payload: false });
        console.log(err);
      });
  }, { scope: 'public_profile, email' });
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
  dispatch(push('/login'));
};

export const createNewGuestUser = username => dispatch => {
  dispatch({ type: SET_LOGIN_LOADING, payload: true });
  return axios.post('/guest_login', { username })
    .then(({ data: { user } }) => {
      dispatch({
        type: SET_USER,
        payload: user,
      });
      dispatch({ type: SET_LOGIN_LOADING, payload: false });
      dispatch(push('/play'));
    }, (err) => {
      dispatch({ type: SET_LOGIN_LOADING, payload: false });
      showNotification('error', {
        title: 'Error',
        message: err.response.data.error,
      });
    });
};

