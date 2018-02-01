import actionTypes from '../actions/actionTypes';

const { REGISTER } = actionTypes;

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case REGISTER:
    return {
      ...state,
      isAuthenticated: true,
      user: action.user
    };

  default:
    return state;
  }
};

