import actionTypes from './actionTypes';

const { IS_LOADING, STOP_LOADING } = actionTypes;

export const isLoading = () => ({
  type: IS_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

export const isLoadingActionCreator = () => (dispatch) => {
  dispatch(isLoading());
};

export const stopLoadingActionCreator = () => (dispatch) => {
  dispatch(stopLoading());
};

