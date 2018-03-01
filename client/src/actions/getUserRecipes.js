import axios from 'axios';
import actionTypes from './actionTypes';

const { GET_USER_RECIPES } = actionTypes;

export const getUserRecipe = (userRecipes, pages) => ({
  type: GET_USER_RECIPES,
  userRecipes,
  pages
});

const getUserRecipesActionCreator = page => (dispatch) => {
  let queryString = '/api/v1/recipes/user/allrecipes';
  if (page) {
    queryString += `?page=${page}`;
  }

  return axios
    .get(queryString, { headers: { token: localStorage.getItem('token') } })
    .then((res) => {
      const { recipes, pages } = res.data;

      dispatch(getUserRecipe(recipes, pages));
    });
};

export default getUserRecipesActionCreator;
