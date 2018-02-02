import actionTypes from '../actions/actionTypes';

const {
  REGISTER, LOGOUT, LOGIN, AUTH_ERROR
} = actionTypes;

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
      user: action.user,
      errorMessage: ''
    };

  case LOGOUT:
    return {
      ...state,
      isAuthenticated: false,
      user: {},
      errorMessage: ''
    };

  case LOGIN:
    return {
      ...state,
      isAuthenticated: true,
      user: action.user,
      errorMessage: ''
    };
  case AUTH_ERROR:
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: action.message
    };


  default:
    return state;
  }
};

