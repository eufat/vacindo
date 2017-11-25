import * as c from './constants';

const initialState = {
  userData: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case c.FETCH_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    default:
      return state;
  }
}
