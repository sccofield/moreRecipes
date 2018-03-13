import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import moxios from 'moxios';
import { PostRecipe, mapDispatchToProps, mapStateToProps }
  from '../../src/components/postRecipe/PostRecipe';
import PostRecipeForm from '../../src/components/postRecipe/PostRecipeForm';

describe('Post recipe controller', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const props = {
    postRecipeActionCreator: jest.fn(() => Promise.resolve()),
    clearNewRecipe: jest.fn(),
    history: {
      push: jest.fn()
    },

  };


  it('should render', () => {
    const wrapper = shallow(<PostRecipe {...props} />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(wrapper.find(PostRecipeForm).exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(
    'sets the state when the value of the input changes',
    () => {
      const spy = sinon.spy(PostRecipe.prototype, 'onChange');
      const wrapper = shallow(<PostRecipe {...props} />);
      const event = {
        target: {
          value: 'recipe title',
          name: 'title'
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state('title')).toBe('recipe title');

      expect(spy.called).toBeTruthy();
    }
  );
});

describe('conatiner functions', () => {
  test('mapStateToProps', () => {
    expect(mapStateToProps({
      recipe: { }
    })).toHaveProperty('newRecipe');
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('postRecipeActionCreator');

    const { postRecipeActionCreator } = mapDispatchToProps(dispatch);
    postRecipeActionCreator();
    expect(dispatch).toHaveBeenCalled();
  });
});

