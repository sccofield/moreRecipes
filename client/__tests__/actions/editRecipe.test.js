import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import localStorage from '../../__mocks__/localStorage';

import actionTypes from '../../src/actions/actionTypes';

import getEditRecipeActionCreator,
{ editRecipeActionCreator } from '../../src/actions/editRecipe';

const { GET_EDIT_RECIPE, EDIT_RECIPE } = actionTypes;

// window.localStorage = localStorage;

const mockStore = configureMockStore([thunk]);

describe('Edit recipe action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch EDIT_RECIPE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { recipe: 'recipe' }
      });
    });
    const expectedAction = [
      {
        type: GET_EDIT_RECIPE,
        recipe: 'recipe'
      }

    ];
    const store = mockStore({ });
    store.dispatch(getEditRecipeActionCreator()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should dispatch GET_EDIT_RECIPE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { recipe: 'recipe' }
      });
    });
    const expectedAction = [
      {
        type: EDIT_RECIPE,
        recipe: 'recipe'
      }

    ];
    const store = mockStore({ });
    store.dispatch(editRecipeActionCreator()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
