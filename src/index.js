import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import firebase from 'firebase';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'sanitize.css/sanitize.css';

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
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  target,
);

registerServiceWorker();
