import axios from 'axios';
import actionTypes from './actionTypes';

const { LOGIN, AUTH_ERROR } = actionTypes;


export const loginUserAction = user => ({
  type: LOGIN,
  user,
});

export const authError = message => ({
  type: AUTH_ERROR,
  isAuthenticated: false,
  message
});

export const requestAuthentication = () => ({
  type: 'REQUEST_AUTHENTICATION'
});

const loginUserActionCreator = data => (dispatch) => {
  dispatch(requestAuthentication());
  return axios
    .post('/api/v1/users/signin', data)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loginUserAction(user));
    // return Promise.resolve();
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(authError(message));
    });
};

export default loginUserActionCreator;

