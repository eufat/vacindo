import * as c from './constants';

const initialState = {
  appData: {},
  participants: {},
  payments: {},
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case c.FETCH_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
    case c.FETCH_PAYMENTS:
      return {
        ...state,
        payments: action.payments,
      };
    case c.FETCH_APPDATA:
      return {
        ...state,
        appData: action.appData,
      };
    default:
      return state;
  }
}
