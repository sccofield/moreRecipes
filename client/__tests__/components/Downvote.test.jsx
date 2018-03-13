import React from 'react';
import sinon from 'sinon';
import { Downvote, mapDispatchToProps }
  from '../../src/components/Downvote';

describe('Downvote component', () => {
  const props = {
    id: 2,
    downvote: [{
      userId: 2,
      recipeId: 3
    }
    ],
    userId: 2,
    downvoteRecipeActionCreator: jest.fn(() => Promise.resolve()),
  };

  it('should render the component', () => {
    const wrapper = shallow(<Downvote {...props} />);
    expect(wrapper.find('button').exists).toBeTruthy();
  });

  it('should show that the Downvote has been clicked', () => {
    const spy = sinon.spy(Downvote.prototype, 'downvote');
    const wrapper = shallow(<Downvote
      {...props}
    />);
    wrapper.find('#downvoteButton').simulate('click');
    expect(spy.called).toBeTruthy();
  });
});

describe('conatiner functions', () => {
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('downvoteRecipeActionCreator');

    const { downvoteRecipeActionCreator } = mapDispatchToProps(dispatch);
    downvoteRecipeActionCreator();
    expect(dispatch).toHaveBeenCalled();
  });
});
