/* eslint-disable no-undef */
import React from 'react';
import { RecipeDetail, mapStateToProps, mapDispatchToProps }
  from '../../src/components/RecipeDetail';

describe('Recipe detail component', () => {
  const props = {
    getSingleRecipeActionCreator: jest.fn(() => Promise.resolve()),
    match: {
      params: {
        id: '2'
      }
    },
    history: {},
    recipe: {
      Review: [],
      createdAt: 'created at',
      description: 'description',
      id: 3,
      imageUrl: 'image url',
      ingredients: 'ingredients',
      title: 'title',
      userName: 'username',
      Favorites: [],
      Upvotes: [],
      Downvotes: [],
      userId: 3
    },
    isAuthenticated: true,
    user: {
      id: 4
    }
  };

  it('should render the component', () => {
    const wrapper = shallow(<RecipeDetail {...props} />);
    expect(wrapper.find('.recipeTitle').exists).toBeTruthy();
  });
});

describe('conatiner functions', () => {
  test('mapStateToProps', () => {
    expect(mapStateToProps({
      user: 'user',
      recipe: [],
      isAuthenticated: true
    })).toHaveProperty('user');
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('getSingleRecipeActionCreator');

    const { getSingleRecipeActionCreator } = mapDispatchToProps(dispatch);
    getSingleRecipeActionCreator();
    expect(dispatch).toHaveBeenCalled();
  });
});
