import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormControl } from 'material-ui/Form';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

const styleSheet = theme => ({
  icon: {
    margin: theme.spacing.unit,
  },
  container: {
    padding: [0, 20],
    maxWidth: '100vw',
  },
  paper: {
    padding: 20,
    minHeight: 200,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Web extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container}>
        <Grid container justify="center" align="flex-start" className={classes.containerGrid}>
          <Grid item md={2} sm={3} xs={12}>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
              <Input
                id="adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon className={classes.icon} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Web.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(withStyles(styleSheet)(Web));
