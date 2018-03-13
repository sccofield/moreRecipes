import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import localStorage from '../../__mocks__/localStorage';

import actionTypes from '../../src/actions/actionTypes';

import addReviewActionCreator from '../../src/actions/addReview';

const { ADD_REVIEW } = actionTypes;

// window.localStorage = localStorage;

const mockStore = configureMockStore([thunk]);

describe('Add review action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch ADD_REVIEW action when dispatched', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { review: 'review' }
      });
    });
    const expectedAction = [
      {
        type: ADD_REVIEW,
        review: 'review'
      }
    ];
    const store = mockStore({ });
    store.dispatch(addReviewActionCreator()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should not dispatch any action when there is an error', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: { message: 'error' }
      });
    });
    const store = mockStore({ });
    store.dispatch(addReviewActionCreator()).then(() => {}).catch(() => {
      expect(store.getActions().length).toEqual(0);
      done();
    });
  });
});
