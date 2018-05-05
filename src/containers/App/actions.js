import * as c from './constants';

export function loadDestinations(destinations) {
  return dispatch =>
    dispatch({
      type: c.LOAD_DESTINATIONS,
      destinations,
    });
}

export function showLoadingBar() {
  return dispatch =>
    dispatch({
      type: c.SHOW_LOADING_BAR,
    });
}

export function hideLoadingBar() {
  return dispatch =>
    dispatch({
      type: c.HIDE_LOADING_BAR,
    });
}

export function successMessage(message) {
  return (dispatch) => {
    dispatch({
      type: c.SUCCESS_MESSAGE,
      message,
    });
    dispatch(hideLoadingBar());
  };
}

export function errorMessage(message) {
  return (dispatch) => {
    dispatch({
      type: c.ERROR_MESSAGE,
      message,
    });
    dispatch(hideLoadingBar());
  };
}
