import axios from 'axios';
import actionTypes from './actionTypes';

const { DELETE_RECIPE } = actionTypes;

export const deleteRecipe = id => ({
  type: DELETE_RECIPE,
  id
});

const deleteRecipeActionCreator = id => dispatch => axios
  .delete(
    `/api/v1/recipes/${id}`,
    { headers: { token: localStorage.getItem('token') } }
  )
  .then(() => {
    dispatch(deleteRecipe(id));
  });

export default deleteRecipeActionCreator;
