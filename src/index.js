import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import Raven from 'raven-js';
// import Reboot from 'material-ui/Reboot';
// import { StackdriverErrorReporter } from 'stackdriver-errors-js';

import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { MuiThemeProvider } from 'material-ui/styles';
import 'sanitize.css/sanitize.css';

import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import firebaseConfig from './firebase.config';
import { ravenConfig } from './errors.config';
// import { ravenConfig, stackdriverConfig } from './errors.config';

import App from './containers/App';

const theme = createMuiTheme();
const target = document.querySelector('#root');

firebase.initializeApp(firebaseConfig);
firebase.firestore();

Raven.config(ravenConfig).install();
// const errorHandler = new StackdriverErrorReporter();
// errorHandler.start(stackdriverConfig);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        {/* <Reboot /> */}
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  target,
);

registerServiceWorker();
