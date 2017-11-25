import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styleSheet = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2,
  },
  formContainer: {
    padding: 20,
  },
});

const OrionSignin = props => (
  <div className={props.classes.formContainer}>
    <TextField
      fullWidth
      margin="dense"
      className={props.classes.input}
      type="email"
      label="Email"
      onBlur={(e) => {
        props.changeSignInFields(e, 'email');
      }}
    />
    <TextField
      fullWidth
      margin="dense"
      className={props.classes.input}
      type="password"
      label="Password"
      onBlur={(e) => {
        props.changeSignInFields(e, 'password');
      }}
    />
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.rememberSignIn}
            onChange={(e, val) => props.changeRememberSignIn(e, val)}
            value="rememberSignIn"
          />
        }
        label="Remember Me"
      />
    </FormGroup>
    <Button raised className={props.classes.button} onClick={() => props.handleOnSubmitAuth()}>
      Sign In
    </Button>
    <Button className={props.classes.button} onClick={() => props.handleOpen()}>
      Reset Password
    </Button>
  </div>
);

OrionSignin.propTypes = {
  classes: PropTypes.object.isRequired,
  changeSignInFields: PropTypes.func.isRequired,
  changeRememberSignIn: PropTypes.func.isRequired,
  rememberSignIn: PropTypes.bool.isRequired,
  handleOnSubmitAuth: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(OrionSignin);
