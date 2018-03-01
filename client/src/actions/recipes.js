import axios from 'axios';
import actionTypes from './actionTypes';

const { GET_ALL_RECIPES } = actionTypes;

export const getAllRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

const getAllRecipesActionCreator = () => dispatch => axios
  .get('/api/v1/recipes')
  .then((res) => {
    const { recipes } = res.data;

    dispatch(getAllRecipes(recipes));
  });

export default getAllRecipesActionCreator;
