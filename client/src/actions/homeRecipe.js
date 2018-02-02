import axios from 'axios';
import actionTypes from './actionTypes';

const { HOME_RECIPE } = actionTypes;

export const getHomeRecipe = (latestRecipes, popularRecipes) => ({
  type: HOME_RECIPE,
  latestRecipes,
  popularRecipes
});

const getHomeRecipeActionCreator = () => dispatch => axios
  .get('api/v1/homeRecipes')
  .then((res) => {
    console.log(res);
    const { latestRecipes, popularRecipes } = res.data;

    dispatch(getHomeRecipe(latestRecipes, popularRecipes));
  });

export default getHomeRecipeActionCreator;
