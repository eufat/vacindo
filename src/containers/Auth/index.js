import omit from 'lodash/omit';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import VacindoSignin from './components/VacindoSignin';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase';

import { submitAuthentication, createAuthentication } from './actions';

function smoothScroll() {
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScroll);
    window.scrollTo(0, currentScroll - currentScroll / 5);
  }
}

const styleSheet = theme => ({
  paper: {
    paddingTop: 20,
  },
  background: {
    minHeight: '100vh',
    marginTop: '10vh',
  },
  containerGrid: {
    width: '100% !important',
    padding: '0 !important',
    marginRight: '0 !important',
  },
  changeQuestion: {
    textAlign: 'center',
  },
});

class Auth extends Component {
  state = {
    click: 0,
    open: false,
    signInPage: true,
    rememberSignIn: true,
    form: {
      signIn: {
        email: '',
        password: '',
      },
      reset: {
        email: '',
      },
    },
  };

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/user/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  incrementClick = () => {
    this.setState({ ...this.state, click: this.state.click + 1 });
  };

  changeToSignInPage = () => {
    this.setState({ ...this.state, signInPage: true });
  };

  changeToSignUpPage = () => {
    this.setState({ ...this.state, signInPage: false });
  };

  handleOnSubmitAuth = () => {
    smoothScroll();
    const submitForm = this.state.form;
    const persistence = this.state.rememberSignIn;
    if (this.state.signInPage) {
      this.props.dispatch(submitAuthentication(submitForm.signIn.email, submitForm.signIn.password, persistence));
    } else {
      const optional = omit(this.state.form.signUp, ['password', 'emailConfirmation']);
      if (this.signUpIsValid()) {
        this.props.dispatch(createAuthentication(submitForm.signUp.email, submitForm.signUp.password, optional));
      }
    }
  };

  changeRememberSignIn = (event, checked) => {
    this.setState({ rememberSignIn: checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>
        <Grid container justify="center" align="flex-start" className={classes.containerGrid}>
          <Grid item md={2} sm={3} xs={12}>
            <center>
              <img src="/static/images/logo.png" alt="logo" width={100} />
            </center>
            <form onSubmit={this.handleOnSubmitAuth}>
              {/* <VacindoSignin
                changeSignInFields={this.changeSignInFields}
                changeRememberSignIn={this.changeRememberSignIn}
                handleOnSubmitAuth={this.handleOnSubmitAuth}
                rememberSignIn={this.state.rememberSignIn}
              /> */}
              <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(withStyles(styleSheet)(Auth));
