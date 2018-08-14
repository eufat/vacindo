import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import VacindoForms from '../VacindoForms';

const styleSheet = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4,
    width: '100%',
  },
  formContainer: {
    padding: 20,
  },
});

const VacindoSignup = props => (
  <div>
    <div className={props.classes.formContainer}>
      <Typography type="title">Sign up</Typography>
      <TextField
        fullWidth
        margin="dense"
        className={props.classes.input}
        type="email"
        label="Your email"
        onBlur={(e) => {
          props.changeSignUpFields(e, 'email');
        }}
      />
      <TextField
        fullWidth
        margin="dense"
        className={props.classes.input}
        type="email"
        label="Retype your email"
        onBlur={(e) => {
          props.changeSignUpFields(e, 'emailConfirmation');
        }}
      />
      <TextField
        fullWidth
        margin="dense"
        className={props.classes.input}
        type="password"
        label="Password"
        onBlur={(e) => {
          props.changeSignUpFields(e, 'password');
        }}
      />
    </div>
    <div className={props.classes.formContainer}>
      <VacindoForms
        changeFormFields={props.changeSignUpFields}
        changeFormSelect={props.changeSignUpSelect}
        forms={props.signUp}
        disabled={false}
      />
      <Button raised color="primary" className={props.classes.button} onClick={() => props.handleOnSubmitAuth()}>
        Sign Up
      </Button>
    </div>
  </div>
);

VacindoSignup.propTypes = {
  classes: PropTypes.object.isRequired,
  changeSignUpFields: PropTypes.func.isRequired,
  changeSignUpSelect: PropTypes.func.isRequired,
  handleOnSubmitAuth: PropTypes.func.isRequired,
  signUp: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(VacindoSignup);
