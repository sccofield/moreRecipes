import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';

const { DOWNVOTE_RECIPE, REMOVE_DOWNVOTE } = actionTypes;

export const downvoteRecipe = vote => ({
  type: DOWNVOTE_RECIPE,
  vote
});

export const removeDownvoteRecipe = userId => ({
  type: REMOVE_DOWNVOTE, userId
});

const downvoteRecipeActionCreator = recipeId => (dispatch, getState) => axios
  .post(
    `/api/v1/users/${recipeId}/downvote`,
    null,
    { headers: { token: localStorage.getItem('token') } }
  )
  .then((res) => {
    const { vote } = res.data;
    if (res.status === 200) {
      dispatch(removeDownvoteRecipe(getState().user.user.id));
      toastr.success('Downvote removed from recipe');
    } else {
      dispatch(downvoteRecipe({
        userId: vote.userId,
        recipeId: vote.recipeId
      }));
      toastr.success('Downvote Recipe successful');
    }
  }).catch((error) => {
    console.log(error);
    const serverError = error.response.data.message;
    toastr.warning(serverError);
  });

export default downvoteRecipeActionCreator;

