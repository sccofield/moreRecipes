import toastr from 'toastr';
import axios from 'axios';
import actionTypes from './actionTypes';


const { GET_EDIT_RECIPE, EDIT_RECIPE } = actionTypes;

export const getEditRecipe = recipe => ({
  type: GET_EDIT_RECIPE,
  recipe
});

export const editRecipeAction = recipe => ({
  type: EDIT_RECIPE,
  recipe
});

const getEditRecipeActionCreator = id => dispatch => axios
  .get(`/api/v1/recipes/${id}`)
  .then((res) => {
    const { recipe } = res.data;
    dispatch(getEditRecipe(recipe));
  });

export const editRecipeActionCreator = (id, recipe) => dispatch => axios
  .put(
    `/api/v1/recipes/${id}`,
    recipe,
    { headers: { token: localStorage.getItem('token') } }
  )
  .then((res) => {
    const recipeData = res.data.recipe;
    dispatch(editRecipeAction(recipeData));
  }).catch((error) => {
    const serverError = error.response.data.message;
    toastr.warning(serverError);
  });

export default getEditRecipeActionCreator;
