import * as c from './constants';

const initialState = {
  currentUser: {},
  isAdmin: false,
  isAuthenticated: false,
  error: {
    login: '',
    register: '',
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case c.AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: true,
      };
    case c.DEAUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: false,
      };
    case c.FETCH_USER_DATA:
      return {
        ...state,
        currentUser: action.user,
      };
    case c.SET_USER_ROLE:
      return {
        ...state,
        isAdmin: action.role,
      };
    default:
      return state;
  }
}
