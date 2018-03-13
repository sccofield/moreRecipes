import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import { Favourite, mapDispatchToProps }
  from '../../src/components/Favourite';

describe('Favouritenvote component', () => {
  const props = {
    id: 2,
    favorites: [{
      userId: 2,
      recipeId: 3
    }
    ],
    userId: 2,
    favouriteRecipeActionCreator: jest.fn(() => Promise.resolve()),
  };

  it('should render the component', () => {
    const wrapper = shallow(<Favourite {...props} />);
    expect(wrapper.find('button').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should show that the Downvote has been clicked', () => {
    const spy = sinon.spy(Favourite.prototype, 'favourite');
    const wrapper = shallow(<Favourite
      {...props}
    />);
    wrapper.find('.btn').simulate('click');
    // expect(spy.called).toBeTruthy();
  });
});

describe('conatiner functions', () => {
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('favouriteRecipeActionCreator');

    const { favouriteRecipeActionCreator } = mapDispatchToProps(dispatch);
    favouriteRecipeActionCreator();
    expect(dispatch).toHaveBeenCalled();
  });
});
