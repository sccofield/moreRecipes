import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';

const { ADD_FAVOURITE, REMOVE_FAVOURITE, GET_FAVOURITE } = actionTypes;

export const addFavouriteRecipe = favorite => ({
  type: ADD_FAVOURITE, favorite
});

export const removeFavouriteRecipe = userId => ({
  type: REMOVE_FAVOURITE, userId
});

export const getFavouriteRecipe = (favourites, pages) => ({
  type: GET_FAVOURITE,
  pages,
  favourites
});

export const getFavouriteRecipeCreator = page => (dispatch) => {
  let queryString = '/api/v1/users/favorites';
  if (page) {
    queryString += `?page=${page}`;
  }

  return axios
    .get(queryString, { headers: { token: localStorage.getItem('token') } })
    .then((res) => {
      const { data, pages } = res.data;

      dispatch(getFavouriteRecipe(data, pages));
    });
};


const favouriteRecipeActionCreator = recipeId => (dispatch, getState) => axios
  .post(
    `/api/v1/users/${recipeId}/favorites`,
    null, { headers: { token: localStorage.getItem('token') } }
  )
  .then((res) => {
    const { favorite } = res.data;
    if (res.status === 200) {
      dispatch(removeFavouriteRecipe(getState().user.user.id));
      toastr.success('You have removed recipe from your favourites');
    } else {
      dispatch(addFavouriteRecipe({
        userId: favorite.userId,
        recipeId: favorite.recipeId
      }));
      toastr.success('Recipe added to favourite');
    }
  }).catch((error) => {
    console.log(error);
    const serverError = error.response.data.message;
    toastr.warning(serverError);
  });

export default favouriteRecipeActionCreator;

