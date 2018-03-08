import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import localStorage from '../../__mocks__/localStorage';

import actionTypes from '../../src/actions/actionTypes';
import registerUserActionCreator from '../../src/actions/register';
import loginUserActionCreator from '../../src/actions/login';
import logoutUserActionCreator from '../../src/actions/logout';

const {
  REGISTER, AUTH_ERROR, LOGIN, LOGOUT
} = actionTypes;

window.localStorage = localStorage;

const mockStore = configureMockStore([thunk]);


describe('Authentication action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('registerUserActionCreator', () => {
    it('should dispatch REGISTER action when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { user: { id: 2 }, token: '1234' }
        });
      });
      const expectedAction = [
        {
          type: REGISTER,
          user: { id: 2 },
          token: '1234'
        },
      ];
      const store = mockStore({ });
      store.dispatch(registerUserActionCreator()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });


    it('should dispatch AUTH_ERROR when there is an error', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: {
            data: { message: 'error' }
          }
        });
      });
      const expectedAction = [
        {
          type: AUTH_ERROR,
          isAuthenticated: false,
          message: 'error'
        }
      ];
      const store = mockStore({ });
      store.dispatch(registerUserActionCreator()).then(() => {
      }).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
  });
  describe('loginUserActionCreator', () => {
    it('should dispatch LOGIN action when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { user: { id: 2 }, token: '1234' }

        });
      });
      const expectedAction = [
        {
          type: 'REQUEST_AUTHENTICATION'
        },
        {
          type: LOGIN,
          user: { id: 2 }
        }
      ];
      const store = mockStore({ });
      store.dispatch(loginUserActionCreator()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
  });
  describe('logoutUserActionCreator', () => {
    it('should dispatch LOGOUT action when dispatched', (done) => {
      const expectedAction = [
        {
          type: LOGOUT
        }
      ];
      const store = mockStore({ });
      store.dispatch(logoutUserActionCreator({}));
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
