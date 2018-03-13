import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import localStorage from '../../__mocks__/localStorage';

import actionTypes from '../../src/actions/actionTypes';

import upvoteRecipeActionCreato from '../../src/actions/upvote';

const { UPVOTE_RECIPE, REMOVE_DOWNVOTE } = actionTypes;

// window.localStorage = localStorage;

const mockStore = configureMockStore([thunk]);

describe('upvote action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch UPVOTE_RECIPE when response is 201', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { vote: { userId: 4, recipeId: 3 } }
      });
    });
    const expectedAction = [
      {
        type: UPVOTE_RECIPE,
        vote: {
          userId: 4,
          recipeId: 3
        }
      }
    ];
    const store = mockStore({ });
    store.dispatch(upvoteRecipeActionCreato()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  // it('should dispatch REMOVE_DOWNVOTE when response is 200)', (done) => {
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 200,
  //       response: { vote: { userId: 4, recipeId: 3 } }
  //     });
  //   });
  //   const expectedAction = [
  //     {
  //       type: DOWNVOTE_RECIPE,
  //       userId: 3
  //     }
  //   ];
  //   const store = mockStore({ });
  //   store.dispatch(downvoteRecipeActionCreator(3)).then(() => {
  //     expect(store.getActions()).toEqual(expectedAction);
  //     done();
  //   });
  // });

  it('should not dispatch any action when there is an error', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: { message: 'error' }
      });
    });
    const store = mockStore({ });
    store.dispatch(upvoteRecipeActionCreato()).then(() => {}).catch(() => {
      expect(store.getActions().length).toEqual(0);
      done();
    });
  });
});
