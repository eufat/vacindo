import * as c from './constants';

const initialState = {
  appData: {},
  tourists: {},
  payments: {},
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case c.FETCH_TOURISTS:
      return {
        ...state,
        tourists: action.tourists,
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
