import defaultState from '../store/defaultState';

export const SET_USER = 'user/SET_USER';
export const SET_LOGIN_LOADING = 'user/SET_LOGIN_LOADING';

export default (state = defaultState.auth, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
      };
    case SET_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: payload,
      };
    default:
      return state;
  }
};
