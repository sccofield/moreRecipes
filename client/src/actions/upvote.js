import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';

const { UPVOTE_RECIPE, REMOVE_UPVOTE } = actionTypes;

export const upvoteRecipe = vote => ({
  type: UPVOTE_RECIPE,
  vote
});

export const removeUpvoteRecipe = userId => ({
  type: REMOVE_UPVOTE, userId
});

const upvoteRecipeActionCreator = recipeId => (dispatch, getState) => axios
  .post(
    `/api/v1/users/${recipeId}/upvote`,
    null, { headers: { token: localStorage.getItem('token') } }
  )
  .then((res) => {
    const { vote } = res.data;
    if (res.status === 200) {
      dispatch(removeUpvoteRecipe(getState().user.user.id));
      toastr.success('Upvote removed from recipe');
    } else {
      dispatch(upvoteRecipe({ userId: vote.userId, recipeId: vote.recipeId }));
      toastr.success('Upvote recipe succesfully');
    }
  }).catch((error) => {
    const serverError = error.response.data.message;
    toastr.warning(serverError);
  });

export default upvoteRecipeActionCreator;

