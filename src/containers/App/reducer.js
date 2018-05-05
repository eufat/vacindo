import * as c from './constants';

const initialState = {
  destinations: [],
  loading: false,
  success: {
    open: false,
    message: '',
  },
  error: {
    open: false,
    message: '',
  },
  drawer: {
    menu: false,
    filter: false,
  },
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case c.LOAD_DESTINATIONS:
      console.log('on action', action.destinations);
      return {
        ...state,
        destinations: action.destinations,
      };
    case c.ERROR_MESSAGE:
      return {
        ...state,
        success: {
          open: false,
        },
        error: {
          open: true,
          message: action.message,
        },
      };
    case c.SUCCESS_MESSAGE:
      return {
        ...state,
        error: {
          open: false,
        },
        success: {
          open: true,
          message: action.message,
        },
      };
    case c.HIDE_ALL_MESSAGES:
      return {
        ...state,
        error: {
          open: false,
          message: '',
        },
        success: {
          open: false,
          message: '',
        },
      };
    case c.SHOW_LOADING_BAR:
      return {
        ...state,
        loading: true,
      };
    case c.HIDE_LOADING_BAR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
