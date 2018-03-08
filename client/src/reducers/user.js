import actionTypes from '../actions/actionTypes';

const {
  REGISTER, LOGOUT, LOGIN, AUTH_ERROR
} = actionTypes;

export const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || {},
  errorMessage: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case REGISTER:

    return {
      ...state,
      isAuthenticated: true,
      user: action.user,
      errorMessage: null
    };
  case 'REQUEST_AUTHENTICATION':
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: null,
      user: {}
    };
  case LOGOUT:
    return {
      ...state,
      isAuthenticated: false,
      user: {},
      errorMessage: null
    };

  case LOGIN:
    return {
      ...state,
      isAuthenticated: true,
      user: action.user,
      errorMessage: null,
    };
  case AUTH_ERROR:
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: action.message,
      user: {}
    };


  default:
    return state;
  }
};

