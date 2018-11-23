import defaultState from '../store/defaultState';

export const SET_APP_LOADING = 'user/SET_APP_LOADING';

export default (state = defaultState.app, { type, payload }) => {
  switch (type) {
    case SET_APP_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

