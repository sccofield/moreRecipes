import axios from 'axios';
import actionTypes from './actionTypes';

const { REGISTER, AUTH_ERROR } = actionTypes;


export const registerUserAction = (user, token) => ({
  type: REGISTER,
  user,
  token
});

export const authError = message => ({
  type: AUTH_ERROR,
  isAuthenticated: false,
  message
});

const registerUserActionCreator = data => dispatch => axios
  .post('api/v1/users/signup', data)
  .then((res) => {
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(registerUserAction(user, token));
    return Promise.resolve(res);
    // redirect user .
  })
  .catch((error) => {
    const { message } = error.response.data;
    dispatch(authError(message));
    return Promise.reject(error);
  });

export default registerUserActionCreator;

