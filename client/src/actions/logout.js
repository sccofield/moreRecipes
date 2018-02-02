import actionTypes from './actionTypes';

const { LOGOUT } = actionTypes;

export const logoutUserAction = () => ({
  type: LOGOUT
});

const logoutUserActionCreator = () => (dispatch) => {
  console.log('loggin out>>>>>>>>>');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(logoutUserAction());
};

export default logoutUserActionCreator;

