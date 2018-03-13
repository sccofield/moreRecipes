import expect from 'expect';

import recipeReducer, { initialState } from '../../src/reducers/recipe';

import actionTypes from '../../src/actions/actionTypes';

const {
  POST_RECIPE,
  HOME_RECIPE,
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE,
  GET_USER_RECIPES,
  ADD_REVIEW,
  GET_EDIT_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  GET_FAVOURITE,
  UPVOTE_RECIPE,
  REMOVE_UPVOTE,
  DOWNVOTE_RECIPE,
  REMOVE_DOWNVOTE
} = actionTypes;

describe('Recipe Reducer', () => {
  it('should return the initial state for an unknow action type', () => {
    const result = recipeReducer(initialState, undefined);
    expect(result).toEqual(initialState);
  });

  it('should return the newRecipe when POST_RECIPE is passed', () => {
    const action = {
      type: POST_RECIPE,
      recipe: {
        title: 'New recipe',
        description: 'New description',
        ingredients: 'meat, apple'
      }
    };
    const result = recipeReducer(initialState, action);
    expect(result.newRecipe).toEqual(action.recipe);
  });

  it('should return latestRecipe and popularRecipes for HOME_RECIPE', () => {
    const action = {
      type: HOME_RECIPE,
      latestRecipes: 'latestRecipe',
      popularRecipes: 'popularRecipe'
    };
    const result = recipeReducer(initialState, action);
    expect(result.latestRecipes).toEqual(action.latestRecipes);
    expect(result.popularRecipes).toEqual(action.popularRecipes);
  });

  it('should handle GET_ALL_RECIPES', () => {
    const action = {
      type: GET_ALL_RECIPES,
      recipes: 'All recipes'
    };
    const result = recipeReducer(initialState, action);
    expect(result.recipes).toEqual(action.recipes);
  });

  it('should handle GET_SINGLE_RECIPE', () => {
    const action = {
      type: GET_SINGLE_RECIPE,
      recipe: {
        id: 2,
        title: 'New Recipe',
        userId: 2,
        userName: 'mike',
        description: 'testt test',
        imageUrl: 'test',
        ingredients: 'test',
        votes: 0,
        views: 0,
        createdAt: '',
        updatedAt: '',
        Reviews: [],
        Favorites: [],
        Upvotes: [],
        Downvotes: []
      }
    };

    const result = recipeReducer(initialState, action);
    expect(result.singleRecipe).toEqual(action.recipe);
  });

  it('should handle GET_USER_RECIPES', () => {
    const action = {
      type: GET_USER_RECIPES,
      userRecipes: 'user recipes',
      pages: 3
    };
    const result = recipeReducer(initialState, action);
    expect(result.userRecipes).toEqual(action.userRecipes);
  });

  it('should handle GET_FAVOURITE', () => {
    const action = {
      type: GET_FAVOURITE,
      favourites: 'favourite recipes',
      pages: 4
    };
    const result = recipeReducer(initialState, action);
    expect(result.favouriteRecipes).toEqual(action.favourites);
  });

  it('should handle CLEAR_NEW_RECIPE', () => {
    const action = {
      type: 'CLEAR_NEW_RECIPE'
    };
    const result = recipeReducer(initialState, action);
    expect(result.newRecipe).toEqual(undefined);
  });

  it('should handle GET_EDIT_RECIPE', () => {
    const action = {
      type: GET_EDIT_RECIPE,
      recipe: 'edit recipe'
    };
    const result = recipeReducer(initialState, action);
    expect(result.editRecipe).toEqual(action.recipe);
  });

  it('should handle EDIT_RECIPE', () => {
    const action = {
      type: EDIT_RECIPE,
      recipe: 'edited recipe'
    };
    const result = recipeReducer(initialState, action);
    expect(result.editedRecipe).toEqual(action.recipe);
  });

  it('should handle DELETE_RECIPE', () => {
    const action = {
      type: DELETE_RECIPE,
      id: 1
    };
    const userRecipes = [
      {
        id: 1,
        name: 'indomie',
        ingredients: 'test, test, test',
        description: 'mix it'
      },
      {
        id: 2,
        name: 'garri',
        ingredients: 'test, test, test',
        description: 'mix it'
      }
    ];
    const result = recipeReducer({ userRecipes }, action);
    expect(result.userRecipes.length).toEqual(1);
    expect(result.userRecipes[0].name).toEqual('garri');
  });

  it('should handle ADD_FAVOURITE', () => {
    const action = {
      type: ADD_FAVOURITE,
      favorite: {
        userId: 2,
        recipeId: 3
      }
    };

    const result = recipeReducer(initialState, action);
    expect(result.singleRecipe.Favorites.length).toEqual(1);
    expect(result.singleRecipe.Favorites[0].userId).toEqual(2);
  });

  it('should handle REMOVE_FAVOURITE', () => {
    const action = {
      type: REMOVE_FAVOURITE,
      userId: 4
    };

    const Favorites = [
      {
        userId: 4,
        recipeId: 2
      },
      {
        userId: 3,
        recipeId: 2
      }
    ];
    const result = recipeReducer({ singleRecipe: { Favorites } }, action);
    expect(result.singleRecipe.Favorites.length).toEqual(1);
    expect(result.singleRecipe.Favorites[0].userId).not.toBe(4);
  });

  it('should handle UPVOTE_RECIPE', () => {
    const action = {
      type: UPVOTE_RECIPE,
      vote: {
        userId: 2,
        recipeId: 3
      }
    };

    const result = recipeReducer(initialState, action);
    expect(result.singleRecipe.Upvotes.length).toEqual(1);
    expect(result.singleRecipe.Upvotes[0].userId).toEqual(2);
    expect(result.singleRecipe.Upvotes).toContain(action.vote);
    expect(result.singleRecipe.Downvotes).not.toContain(action.vote);
  });

  it('should handle REMOVE_UPVOTE', () => {
    const action = {
      type: REMOVE_UPVOTE,
      userId: 4
    };

    const Upvotes = [
      {
        userId: 4,
        recipeId: 2
      },
      {
        userId: 3,
        recipeId: 2
      }
    ];
    const result = recipeReducer({ singleRecipe: { Upvotes } }, action);
    expect(result.singleRecipe.Upvotes.length).toEqual(1);
    expect(result.singleRecipe.Upvotes).not.toContain(Upvotes[0]);
  });

  it('should handle DOWNVOTE_RECIPE', () => {
    const action = {
      type: DOWNVOTE_RECIPE,
      vote: {
        userId: 2,
        recipeId: 3
      }
    };

    const result = recipeReducer(initialState, action);
    expect(result.singleRecipe.Downvotes.length).toEqual(1);
    expect(result.singleRecipe.Downvotes[0].userId).toEqual(2);
    expect(result.singleRecipe.Downvotes).toContain(action.vote);
    expect(result.singleRecipe.Upvotes).not.toContain(action.vote);
  });

  it('should handle REMOVE_DOWNVOTE', () => {
    const action = {
      type: REMOVE_DOWNVOTE,
      userId: 4
    };

    const Downvotes = [
      {
        userId: 4,
        recipeId: 2
      },
      {
        userId: 3,
        recipeId: 2
      }
    ];
    const result = recipeReducer({ singleRecipe: { Downvotes } }, action);
    expect(result.singleRecipe.Downvotes.length).toEqual(1);
    expect(result.singleRecipe.Downvotes).not.toContain(Downvotes[0]);
  });

  it('should handle ADD_REVIEW', () => {
    const action = {
      type: ADD_REVIEW,
      review: {
        review: 'nice recipe'
      }
    };

    const result = recipeReducer(initialState, action);
    expect(result.singleRecipe.Reviews).toContain(action.review);
    expect(result.singleRecipe.Reviews.length).toBeGreaterThan(0);
  });
});

