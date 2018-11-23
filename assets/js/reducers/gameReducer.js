import defaultState from '../store/defaultState';

export const SET_SCORE_SUBMITTING = 'game/SET_SCORE_SUBMITTING';

export default (state = defaultState.game, { type, payload }) => {
  switch (type) {
    case SET_SCORE_SUBMITTING:
      return {
        ...state,
        scoreSubmitting: payload,
      };
    default: return state;
  }
};
