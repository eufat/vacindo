import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styleSheet = theme => ({
  head: {
    padding: [40, 0],
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
  componentDidMount() {
    window.location.href = '/in.htm';
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12}>
          <div className={classes.head}>
            <h1>Redirecting ...</h1>
          </div>
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
