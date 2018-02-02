import actionTypes from '../actions/actionTypes';

const { POST_RECIPE, HOME_RECIPE } = actionTypes;


export default (state = [], action = {}) => {
  switch (action.type) {
  case POST_RECIPE:
    return [
      ...state, action.recipe
    ];
  case HOME_RECIPE:
    return [
      ...state,
      ...action.latestRecipes, ...action.popularRecipes
    ];


  default:
    return state;
  }
};

