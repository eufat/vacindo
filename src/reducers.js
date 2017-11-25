import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './containers/Auth/reducer';
import app from './containers/App/reducer';
import admin from './containers/Admin/reducer';
import user from './containers/User/reducer';

export default combineReducers({
  router: routerReducer,
  auth,
  app,
  admin,
  user,
});
