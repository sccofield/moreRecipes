import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';

import { Upvote, mapDispatchToProps }
  from '../../src/components/Upvote';

describe('Upvote component', () => {
  const props = {
    id: 2,
    upvote: [{
      userId: 2,
      recipeId: 3
    }
    ],
    userId: 2,
    upvoteRecipeActionCreator: jest.fn(() => Promise.resolve()),
  };

  it('should render the component', () => {
    const wrapper = shallow(<Upvote {...props} />);
    expect(wrapper.find('button').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should show that the upvote has been clicked', () => {
    const spy = sinon.spy(Upvote.prototype, 'upvote');
    const wrapper = shallow(<Upvote
      {...props}
    />);
    wrapper.find('#upvoteButton').simulate('click');
    expect(spy.called).toBeTruthy();
  });
});

describe('conatiner functions', () => {
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('upvoteRecipeActionCreator');

    const { upvoteRecipeActionCreator } = mapDispatchToProps(dispatch);
    upvoteRecipeActionCreator();
    expect(dispatch).toHaveBeenCalled();
  });
});
