import * as c from './constants';

const initialState = {
  userData: {},
  bookings: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case c.FETCH_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    case c.ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.booking],
      };
    case c.SET_DESTINATIONS:
      return {
        ...state,
        destinations: action.destinations,
      };
    default:
      return state;
  }
}
