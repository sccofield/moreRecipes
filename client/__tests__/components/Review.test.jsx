import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import moxios from 'moxios';
import { Review, mapDispatchToProps, mapStateToProps }
  from '../../src/components/review/Review';

describe('Review controller', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const props = {
    addReviewActionCreator: jest.fn(() => Promise.resolve()),
    reviews: {
      userName: 'mike',
      createdAt: 'today',
      review: 'review'
    },
    recipeId: 2,
    isAuthenticated: true

  };


  it('should render', () => {
    const wrapper = shallow(<Review {...props} />);
    expect(wrapper.find('.review').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(
    'sets the state when the value of the input changes',
    () => {
      const spy = sinon.spy(Review.prototype, 'onChange');
      const wrapper = shallow(<Review {...props} />);
      const event = {
        target: {
          value: 'nice review',
          name: 'review'
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state('review')).toBe('nice review');

      expect(spy.called).toBeTruthy();
    }
  );
});

describe('conatiner functions', () => {
  test('mapStateToProps', () => {
    expect(mapStateToProps({
      recipe: {
        singleRecipe: {
          Reviews: 'reviews'
        }
      },
      user: {
        isAuthenticated: true
      }
    })).toHaveProperty('reviews');
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('addReviewActionCreator');

    const { addReviewActionCreator } = mapDispatchToProps(dispatch);
    addReviewActionCreator();
    expect(dispatch).toHaveBeenCalled();
  });
});

