import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const styleSheet = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2,
  },
});

const OrionReset = props => (
  <Dialog
    fullScreen
    open={props.open}
    onRequestClose={() => props.handleRequestClose()}
    transition={<Slide direction="up" />}
  >
    <Grid container>
      <Grid item xs={12} sm={6} justify="center" align="flex-start">
        <div className={props.classes.container}>
          <Typography type="title" color="inherit" noWrap>
            Reset Password
          </Typography>
          <Typography type="subheading" color="inherit" noWrap>
            <p>Input your email so you can change your password through link given.</p>
          </Typography>
          <TextField
            id="resetEmail"
            label="Reset Email"
            value={props.email}
            onChange={e => props.changeResetFields(e)}
            margin="normal"
          />
          <div>
            <Button raised className={props.classes.button} onClick={() => props.handleOnReset()}>
              Send Password
            </Button>
            <Button onClick={() => props.handleRequestClose()}>Cancel</Button>
          </div>
        </div>
      </Grid>
    </Grid>
  </Dialog>
);

OrionReset.propTypes = {
  email: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleOnReset: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  changeResetFields: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(OrionReset);
