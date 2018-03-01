import actionTypes from '../actions/actionTypes';

const {
  REGISTER, LOGOUT, LOGIN, AUTH_ERROR, ADD_FAVOURITE
} = actionTypes;

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || {},
  errorMessage: null,
  loading: null
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
  case 'REQUEST_AUTHENTICATION':
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: null,
      loading: true
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
      errorMessage: '',
      loading: false
    };
  case AUTH_ERROR:
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: action.message,
      loading: false
    };
  case ADD_FAVOURITE:
    return {
      ...state
    };


  default:
    return state;
  }
};

