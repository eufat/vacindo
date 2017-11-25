import isEqual from 'lodash/isEqual';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styleSheet = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  forefront: {
    zIndex: 16777271,
  },
});

class OrionSnackbar extends Component {
  constructor(props) {
    super();
    this.state = {
      open: props.state.open,
      message: props.state.message,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.state, this.state)) {
      if (nextProps.state.message !== this.state.message) {
        this.setState(nextProps.state);
      }
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { message, open } = this.state;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={classes.forefront}
        open={open}
        autoHideDuration={6e3}
        onRequestClose={this.handleRequestClose}
        message={message}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

OrionSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object,
};

OrionSnackbar.defaultProps = {
  state: {
    open: false,
  },
};

export default withStyles(styleSheet)(OrionSnackbar);
