import omit from 'lodash/omit';
import some from 'lodash/some';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import update from 'immutability-helper';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import OrionSignup from './components/OrionSignup';
import OrionSignin from './components/OrionSignin';
import OrionReset from './components/OrionReset';

import { submitAuthentication, createAuthentication, resetAuthentication } from './actions';
import { errorMessage } from '../App/actions';

function smoothScroll() {
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScroll);
    window.scrollTo(0, currentScroll - currentScroll / 5);
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const styleSheet = theme => ({
  paper: {
    paddingTop: 20,
  },
  background: {
    minHeight: '100vh',
    marginTop: '0',
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
    open: false,
    signInPage: true,
    rememberSignIn: true,
    form: {
      signIn: {
        email: '',
        password: '',
      },
      signUp: {
        email: '',
        emailConfirmation: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        school: '',
        location: '',
        examType: '',
        referral: '',
      },
      reset: {
        email: '',
      },
    },
  };

  componentWillMount() {
    // const query = new URLSearchParams(window.location.search);
    // // When the URL is /path?toSignUp=true set page to signUp
    // const toSignUp = query.get('toSignUp');
    // if (toSignUp !== null && toSignUp === 'true') {
    //   this.changeToSignUpPage();
    // }
  }

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

  signUpIsValid = () => {
    const dispatch = this.props.dispatch;
    const signUpForm = this.state.form.signUp;
    const emailIsConfirmed = signUpForm.email === signUpForm.emailConfirmation;
    const emailIsValid = validateEmail(signUpForm.email);

    if (some(signUpForm, field => field === '')) {
      dispatch(errorMessage('Signup form must be completed'));
      return false;
    }
    if (!emailIsConfirmed) {
      dispatch(errorMessage('Email confirmation wrong'));
      return false;
    }
    if (!emailIsValid) {
      dispatch(errorMessage('Email is not correct'));
      return false;
    }

    return true;
  };

  changeSignInFields = (e, field) => {
    const prevState = this.state.form;
    const newState = update(prevState.signIn, {
      $merge: { [field]: e.target.value },
    });
    this.setState({
      ...this.state,
      form: { ...prevState, signIn: newState },
    });
  };

  changeRememberSignIn = (event, checked) => {
    this.setState({ rememberSignIn: checked });
  };

  changeResetFields = (event) => {
    const prevState = this.state.form;
    const newState = { email: event.target.value };
    this.setState({
      ...this.state,
      form: { ...prevState, reset: newState },
    });
  };

  changeSignUpFields = (e, field) => {
    const prevState = this.state.form;
    const newState = update(prevState.signUp, {
      $merge: { [field]: e.target.value },
    });
    this.setState({
      ...this.state,
      form: { ...prevState, signUp: newState },
    });
  };

  changeSignUpSelect = name => (e) => {
    const prevState = this.state.form;
    const newState = update(prevState.signUp, {
      $merge: { [name]: e.target.value },
    });
    this.setState({
      ...this.state,
      form: { ...prevState, signUp: newState },
    });
  };

  handleRequestClose = () => {
    this.setState({ ...this.state, open: false });
  };

  handleOpen = () => {
    this.setState({ ...this.state, open: true });
  };

  handleOnReset = () => {
    this.props.dispatch(resetAuthentication(this.state.form.reset.email));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>
        <Grid container justify="center" align="flex-start" className={classes.containerGrid}>
          <Grid item md={4} sm={6} xs={12}>
            <center>
              <img src="/static/images/logo.jpg" alt="logo" width={240} />
            </center>
            <form onSubmit={this.handleOnSubmitAuth}>
              {this.state.signInPage ? (
                <OrionSignin
                  changeSignInFields={this.changeSignInFields}
                  changeRememberSignIn={this.changeRememberSignIn}
                  handleOnSubmitAuth={this.handleOnSubmitAuth}
                  rememberSignIn={this.state.rememberSignIn}
                  handleOpen={this.handleOpen}
                />
              ) : (
                <OrionSignup
                  changeSignUpFields={this.changeSignUpFields}
                  changeSignUpSelect={this.changeSignUpSelect}
                  handleOnSubmitAuth={this.handleOnSubmitAuth}
                  signUp={this.state.form.signUp}
                />
              )}
            </form>
            <div className={classes.changeQuestion}>
              {
                this.state.signInPage ?
                  <div>
                    <p>Doesn't have an account? <Button dense onClick={() => this.changeToSignUpPage()}>Sign Up</Button></p>
                  </div>
                :
                  <div>
                    <p>Already an account? <Button dense onClick={() => this.changeToSignInPage()}>Sign In</Button></p>
                  </div>
              }
            </div>
          </Grid>
        </Grid>
        <OrionReset
          open={this.state.open}
          changeResetFields={this.changeResetFields}
          handleOpen={this.handleOpen}
          handleOnReset={this.handleOnReset}
          handleRequestClose={this.handleRequestClose}
        />
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
