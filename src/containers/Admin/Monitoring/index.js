import values from 'lodash/values';
import get from 'lodash/get';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const styleSheet = theme => ({
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
    fontWeight: 'normal',
    fontSize: '2em',
  }
});

class Monitoring extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { appData } = this.props;
    const data = values(get(appData, 'timeline', {}));

    // add range 1 year, 6 mo, 3 mo, 1 mo, 1 week
    this.setData(data.sort((a, b) => {
      function dateToNum(string) {
        const prevDate = string.split('-');
        const [day, month, year] = prevDate;
        const newDate = year + month + day;
        return +newDate;
      }
      return dateToNum(a.date) - dateToNum(b.date);
    }));
  }

  setData = (data) => {
    this.setState({ data });
  };

  render() {
    const { classes, appData } = this.props;

    return (
      <div>
        <center>Timeline</center>
        <ResponsiveContainer aspect={4.0 / 1.0} width="100%">
          <LineChart data={this.state.data}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip />
            <Legend />
            <Line type="curveLinier" dataKey="payment" stroke="#8884d8" />
            <Line type="curveLinier" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'usersCount', 0)}</h2>
              <p>Total Participants</p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'deletedUsersCount', 0)}</h2>
              <p>Declined Participants</p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'examsCount.ipa', 0)}</h2>

              <p>IPA Participants</p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'examsCount.ips', 0)}</h2>
              <p>IPS Participants</p>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'paymentsCount', 0)}</h2>

              <p>Total Payments</p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'deletedPaymentsCount', 0)}</h2>
              <p>Verified Payments</p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'methodsCount.transfer', 0)}</h2>
              <p>Transfer Payments</p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'methodsCount.voucher', 0)}</h2>
              <p>Voucher Payments</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Monitoring.propTypes = {
  appData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ admin }) {
  return {
    appData: admin.appData,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Monitoring));
