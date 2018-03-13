import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import localStorage from '../../__mocks__/localStorage';

import actionTypes from '../../src/actions/actionTypes';

import deleteRecipeActionCreator from '../../src/actions/deleteRecipe';

const { DELETE_RECIPE } = actionTypes;

// window.localStorage = localStorage;

const mockStore = configureMockStore([thunk]);

describe('delete recipe action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch DELETE_RECIPE when dispatched', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });
    const expectedAction = [
      {
        type: DELETE_RECIPE,
        id: 4
      }
    ];
    const store = mockStore({ });
    store.dispatch(deleteRecipeActionCreator(4)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});

