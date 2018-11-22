import defaultState from '../store/defaultState';


export default (state = defaultState.user, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
