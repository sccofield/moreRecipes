import axios from 'axios';
import actionTypes from './actionTypes';

const { POST_RECIPE } = actionTypes;

export const postRecipeAction = recipe => ({
  type: POST_RECIPE,
  recipe
});

export const clearNewRecipe = () => ({
  type: 'CLEAR_NEW_RECIPE',
});

const postRecipeActionCreator = recipe => dispatch => axios
  .post(
    '/api/v1/recipes',
    recipe, { headers: { token: localStorage.getItem('token') } }
  )
  .then((res) => {
    const recipeData = res.data.recipe;
    dispatch(postRecipeAction(recipeData));
  }).catch(() => {
  });

export default postRecipeActionCreator;
