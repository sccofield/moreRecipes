import axios from 'axios';
import actionTypes from './actionTypes';

const { REGISTER } = actionTypes;


export const registerUserAction = user => ({
  type: REGISTER,
  user
});

const registerUserActionCreator = data => (dispatch) => {
  axios
    .post('api/v1/users/signup', data)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(registerUserAction(user));
    });
};

export default registerUserActionCreator;

