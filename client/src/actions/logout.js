import toastr from 'toastr';
import actionTypes from './actionTypes';

const { LOGOUT } = actionTypes;

export const logoutUserAction = () => ({
  type: LOGOUT
});

const logoutUserActionCreator = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(logoutUserAction());
  toastr.success('You successfully logged out.');
};

export default logoutUserActionCreator;

