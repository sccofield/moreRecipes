import actionTypes from '../actions/actionTypes';

const {
  POST_RECIPE,
  HOME_RECIPE,
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE,
  GET_USER_RECIPES,
  ADD_REVIEW,
  GET_EDIT_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  GET_FAVOURITE,
  UPVOTE_RECIPE,
  REMOVE_UPVOTE,
  DOWNVOTE_RECIPE,
  REMOVE_DOWNVOTE
} = actionTypes;

export const initialState = {
  latestRecipes: [],
  popularRecipes: [],
  recipes: [],
  userRecipes: [],
  favouriteRecipes: [],
  newRecipe: {},
  singleRecipe: {
    id: '',
    title: '',
    userId: '',
    userName: '',
    description: '',
    imageUrl: '',
    ingredients: '',
    votes: 0,
    views: 0,
    createdAt: '',
    updatedAt: '',
    Reviews: [],
    Favorites: [],
    Upvotes: [],
    Downvotes: []

  }
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
  case POST_RECIPE:
    return {
      ...state,
      newRecipe: action.recipe
    };
  case HOME_RECIPE:
    return {
      ...state,
      latestRecipes: action.latestRecipes,
      popularRecipes: action.popularRecipes
    };

  case GET_ALL_RECIPES:
    return {
      ...state,
      recipes: action.recipes
    };

  case GET_SINGLE_RECIPE:
    return {
      ...state,
      singleRecipe: action.recipe
    };

  case GET_USER_RECIPES:
    return {
      ...state,
      userRecipes: action.userRecipes,
      pageCount: action.pages
    };

  case GET_FAVOURITE:
    return {
      ...state,
      favouriteRecipes: action.favourites,
      favPageCount: action.pages
    };

  case 'CLEAR_NEW_RECIPE':
    return {
      ...state,
      newRecipe: undefined,
    };

  case ADD_REVIEW:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Reviews: [...state.singleRecipe.Reviews, action.review]
      }
    };

  case GET_EDIT_RECIPE:
    return {
      ...state,
      editRecipe: action.recipe,
      editedRecipe: null
    };

  case EDIT_RECIPE:
    return {
      ...state,
      editedRecipe: action.recipe
    };

  case DELETE_RECIPE:
    return {
      ...state,
      userRecipes:
      state.userRecipes.filter(recipe => parseInt(
        recipe.id,
        10
      ) !== parseInt(action.id, 10))
    };

  case ADD_FAVOURITE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Favorites: [
          ...state.singleRecipe.Favorites || [],
          action.favorite
        ]
      }
    };
  case REMOVE_FAVOURITE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Favorites:
        state.singleRecipe.Favorites.filter(fav => fav.userId !== action.userId)
      }
    };
  case UPVOTE_RECIPE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Upvotes: [
          ...state.singleRecipe.Upvotes,
          action.vote
        ],
        Downvotes:
        state.singleRecipe.Downvotes.filter(vote =>
          vote.userId === action.userId)
      }
    };
  case REMOVE_UPVOTE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Upvotes:
        state.singleRecipe.Upvotes.filter(vote => vote.userId !== action.userId)
      }
    };
  case DOWNVOTE_RECIPE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Downvotes: [
          ...state.singleRecipe.Downvotes,
          action.vote
        ],
        Upvotes:
        state.singleRecipe.Upvotes.filter(vote => vote.userId === action.userId)
      }
    };
  case REMOVE_DOWNVOTE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Downvotes:
        state.singleRecipe.Downvotes.filter(vote =>
          vote.userId !== action.userId)
      }
    };
  default:
    return state;
  }
};

