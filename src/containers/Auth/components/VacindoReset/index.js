import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styleSheet = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
});

const VacindoReset = props => (
  <Dialog
    open={props.open}
    onRequestClose={() => props.handleRequestClose()}
  >
    <DialogTitle>Reset Password</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To reset your password, please enter your email address here. We will send
        your reset password link.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        value={props.email}
        onChange={e => props.changeResetFields(e)}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.handleRequestClose()} color="primary">
        Cancel
      </Button>
      <Button raised className={props.classes.button} onClick={() => props.handleOnReset()} color="primary">
        Send Link
      </Button>
    </DialogActions>
  </Dialog>
);

VacindoReset.propTypes = {
  email: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleOnReset: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  changeResetFields: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(VacindoReset);
