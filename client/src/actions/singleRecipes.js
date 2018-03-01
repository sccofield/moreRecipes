import axios from 'axios';
import actionTypes from './actionTypes';

const { GET_SINGLE_RECIPE } = actionTypes;

export const getSingleRecipe = recipe => ({
  type: GET_SINGLE_RECIPE,
  recipe
});

const getSingleRecipeActionCreator = id => dispatch => axios
  .get(`/api/v1/recipes/${id}`)
  .then((res) => {
    const { recipe } = res.data;
    dispatch(getSingleRecipe(recipe));
  });

export default getSingleRecipeActionCreator;
