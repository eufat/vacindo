import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

const styleSheet = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2,
    width: '100%',
  },
  buttonWrap: {
    display: 'flex',
  },
  formContainer: {
    padding: 20,
  },
});

const VacindoSignin = props => (
  <div className={props.classes.formContainer}>
    <Typography type="title">Sign in</Typography>
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
    <div className={props.classes.buttonWrap}>
      <Button
        raised
        color="primary"
        className={props.classes.button}
        onClick={() => props.handleOnSubmitAuth()}
      >
        Sign In
      </Button>
    </div>
  </div>
);

VacindoSignin.propTypes = {
  classes: PropTypes.object.isRequired,
  changeSignInFields: PropTypes.func.isRequired,
  changeRememberSignIn: PropTypes.func.isRequired,
  rememberSignIn: PropTypes.bool.isRequired,
  handleOnSubmitAuth: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(VacindoSignin);
