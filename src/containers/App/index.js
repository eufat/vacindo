/* eslint-disable no-confusing-arrow */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Auth from '../Auth';
import Admin from '../Admin';
import User from '../User';
import Web from '../Web';
import VacindoSnackbar from '../../components/VacindoSnackbar';

import { checkAuthentication } from '../Auth/actions';
import { loadDestinations } from './actions';

import dummy from '../../dummy.json';

let { data } = dummy;
data = data.slice(0, 20);

const styleSheet = theme => ({
  root: {
    maxWidth: '100vw !important',
    zIndex: 1,
    fontFamily: theme.typography.fontFamily,
  },
  loadingBar: {
    zIndex: 9999,
  },
});

class App extends Component {
  componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(checkAuthentication(history));
    dispatch(loadDestinations(data));
  }
  render() {
    const {
      classes, loading, isAuthenticated, success, error,
    } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>Vacindo App</title>
        </Helmet>
        <div className={classes.loadingBar}>
          <LinearProgress style={{ display: loading ? 'block' : 'none' }} />
        </div>
        <VacindoSnackbar state={success} />
        <VacindoSnackbar state={error} />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isAuthenticated ? <Redirect to="/dashboard" /> : <Web {...this.props} />
            }
          />
          <Route
            path="/auth"
            render={() =>
              isAuthenticated ? <Redirect to="/dashboard" /> : <Auth {...this.props} />
            }
          />
          <Route
            path="/admin"
            render={() => (isAuthenticated ? <Redirect to="/" /> : <Admin {...this.props} />)}
          />
          <Route
            path="/user"
            render={() => (isAuthenticated ? <Redirect to="/" /> : <User {...this.props} />)}
          />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  success: PropTypes.object,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

App.defaultProps = {
  success: {
    open: false,
    message: '',
  },
  error: {
    open: false,
    message: '',
  },
};

function mapStateToProps({ app, auth }) {
  return {
    loading: app.loading,
    isAuthenticated: auth.isAuthenticated,
    currentUser: auth.currentUser,
    success: app.success,
    error: app.error,
  };
}

export default withRouter(withStyles(styleSheet)(connect(mapStateToProps)(App)));
