import toastr from 'toastr';
import axios from 'axios';
import actionTypes from './actionTypes';


const { ADD_REVIEW } = actionTypes;


export const addReviewAction = review => ({
  type: ADD_REVIEW,
  review
});

const addReviewActionCreator = (review, id) => dispatch => axios
  .post(
    `/api/v1/recipes/${id}/reviews`,
    review,
    { headers: { token: localStorage.getItem('token') } }
  )
  .then((res) => {
    const reviewData = res.data.review;
    dispatch(addReviewAction(reviewData));
    toastr.success('Your Review has been added');
  })
  .catch((error) => {
    const errorMessage = error.response.data.message;
    toastr.warning(errorMessage);
  });


export default addReviewActionCreator;
