import expect from 'expect';

// import userReducer and initial state
import userReducer from '../../src/reducers/user';
// import actionTypes
import actionTypes from '../../src/actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  errorMessage: null,
}

const {
  REGISTER, LOGOUT, LOGIN, AUTH_ERROR
} = actionTypes;

// Test userReducers
describe('userReducer', () => {
  it('should return the initial state for unknown action types', () => {
    const result = userReducer(initialState, undefined);
    expect(result).toEqual(initialState);
  });

  it('should set error message to null with REQUEST AUTHENTICATION', () => {
    const action = {
      type: 'REQUEST_AUTHENTICATION'
    };
    const newState = {
      isAuthenticated: false,
      errorMessage: null,
      user: {}
    };
    const result = userReducer(initialState, action);
    expect(result).toEqual(newState);
  });

  it('should update state with new user when REGISTER is passed ', () => {
    const action = {
      type: REGISTER,
      user: {
        id: 2,
        email: 'michael@gmail.com'
      }
    };
    const newState = {
      isAuthenticated: true,
      user: {
        id: 2,
        email: 'michael@gmail.com'
      },
      errorMessage: null
    };
    const result = userReducer(initialState, action);
    expect(result).toEqual(newState);
  });

  it('should remove the user from state when LOGOUT is passed', () => {
    const action = {
      type: LOGOUT
    };
    const newState = {
      isAuthenticated: false,
      errorMessage: null,
      user: {}
    };
    const result = userReducer(initialState, action);
    expect(result).toEqual(newState);
  });

  it('should update the state with user when LOGIN is passed', () => {
    const action = {
      type: LOGIN,
      user: {
        id: 2,
        email: 'michael@gmail.com'
      }
    };
    const newState = {
      isAuthenticated: true,
      user: {
        id: 2,
        email: 'michael@gmail.com'
      },
      errorMessage: null
    };
    const result = userReducer(initialState, action);
    expect(result).toEqual(newState);
  });

  it('should update the state with the error when AUTH_ERROR is passed', () => {
    const action = {
      type: AUTH_ERROR,
      message: 'email already used'
    };
    const newState = {
      isAuthenticated: false,
      user: {},
      errorMessage: 'email already used'
    };
    const result = userReducer(initialState, action);
    expect(result).toEqual(newState);
  });
});
