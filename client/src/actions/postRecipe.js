import axios from 'axios';
import actionTypes from './actionTypes';

const { POST_RECIPE } = actionTypes;

const token = localStorage.getItem('token');

export const postRecipeAction = recipe => ({
  type: POST_RECIPE,
  recipe
});

const postRecipeActionCreator = recipe => dispatch => axios
  .post('api/v1/recipes', recipe, { headers: { token } })
  .then((res) => {
    const recipeData = res.data.recipe;
    dispatch(postRecipeAction(recipeData));
    return Promise.resolve();
  });

export default postRecipeActionCreator;
