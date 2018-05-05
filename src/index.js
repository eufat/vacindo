import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import firebase from 'firebase';

import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { MuiThemeProvider } from 'material-ui/styles';
import 'sanitize.css/sanitize.css';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import firebaseConfig from './firebase.config';

import App from './containers/App';

const theme = createMuiTheme();
const target = document.querySelector('#root');

firebase.initializeApp(firebaseConfig);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  target,
);

registerServiceWorker();
