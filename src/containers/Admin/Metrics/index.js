import get from 'lodash/get';

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { IDR } from '../../../utils/numberHelper';

const styles = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  paper: {
    padding: 16,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  number: {
    color: theme.palette.text.primary,
    fontWeight: 'normal',
    fontSize: '2em',
  },
});

class Metrics extends Component {
  state = {
    data: [],
  };

  render() {
    const { classes } = this.props;
    const appData = {
      destinationsCount: 3,
      destinationsViews: 23434,
      bookingsCount: 30,
      paymentsCount: 20,
      successfulPayments: 18,
      totalRevenue: 35456000,
    };

    return (
      <div>
        <div style={{ padding: 20 }}>
          <Typography type="title">Metrics</Typography>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper}>
                <h2 className={classes.number}>{get(appData, 'destinationsCount', 0)}</h2>
                <p>Total Destinations</p>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper}>
                <h2 className={classes.number}>{get(appData, 'destinationsViews', 0)}</h2>
                <p>Destinations Views</p>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper}>
                <h2 className={classes.number}>{get(appData, 'bookingsCount', 0)}</h2>
                <p>Total Bookings</p>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper}>
                <h2 className={classes.number}>{get(appData, 'paymentsCount', 0)}</h2>
                <p>Total Payments</p>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper}>
                <h2 className={classes.number}>{get(appData, 'successfulPayments', 0)}</h2>
                <p>Successful Payments</p>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper}>
                <h2 className={classes.number}>{IDR(get(appData, 'totalRevenue', 0))}</h2>
                <p>Total Revenue</p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Metrics);
