import values from 'lodash/values';
import get from 'lodash/get';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
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

function dateToMillis(string) {
  // convert format 'day-month-year' to millisecond
  const prevDate = string.split('-');
  const [day, month, year] = prevDate;
  const newDate = new Date(`${month} ${day} ${year}`);
  return newDate.getTime();
}

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
  timeline: {
    marginBottom: 10,
    marginTop: 10,
    padding: 16,
  },
  number: {
    color: theme.palette.text.primary,
    fontWeight: 'normal',
    fontSize: '2em',
  },
  formControl: {
    minWidth: 200,
    marginRight: 5,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Monitoring extends Component {
  state = {
    data: [],
    timeRange: 0,
    graphMode: 1,
  };

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    const { appData } = this.props;
    let data = this.sortDataDate(values(get(appData, 'timeline', {})));
    if (data.length > 1) {
      data = this.changeTimeRange(data);
      data = this.changeGraphMode(data);
    }
    this.setState({ data });
  };

  sortDataDate = (data) => {
    data.sort((a, b) => dateToMillis(a.date) - dateToMillis(b.date));
    return data;
  }

  changeTimeRange = (d) => {
    let data = d;
    const value = this.state.timeRange;

    const date = new Date();
    const now = date.getTime();

    if (value > 0) {
      const day = value;
      data = data.filter((item) => {
        const timeRange = 1000 * 60 * 60 * 24 * day;
        return dateToMillis(item.date) > (now - timeRange);
      });
    }

    return data;
  }

  changeGraphMode = (d) => {
    let data = d;
    const value = this.state.graphMode;

    if (value > 0) {
      const shadowData = data;
      data = data.map((item, index) => {
        let newItem = item;
        if (index > 0) {
          const prevItem = shadowData[index - 1];
          newItem = {
            users: prevItem.users + item.users,
            payments: prevItem.payments + item.payments,
          };
          shadowData[index] = newItem;
        }
        return newItem;
      });
    }

    return data;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.updateData());
  };

  render() {
    const { classes, appData } = this.props;

    return (
      <div>
        <Typography type="title">Timeline</Typography>
        <form autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="timeRange-simple">Time Range</InputLabel>
            <Select
              value={this.state.timeRange}
              onChange={this.handleChange}
              input={<Input name="timeRange" id="timeRange-simple" />}
            >
              <MenuItem value={0}>All Time</MenuItem>
              <MenuItem value={90}>Last 3 Month</MenuItem>
              <MenuItem value={30}>Last 1 Month</MenuItem>
              <MenuItem value={7}>Last 1 Week</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="graphMode-simple">Graph Mode</InputLabel>
            <Select
              value={this.state.graphMode}
              onChange={this.handleChange}
              input={<Input name="graphMode" id="graphMode-simple" />}
            >
              <MenuItem value={0}>Single Mode</MenuItem>
              <MenuItem value={1}>Total Mode</MenuItem>
            </Select>
          </FormControl>
        </form>
        <Paper className={classes.timeline}>
          <ResponsiveContainer aspect={4.0 / 1.0} width="100%">
            <LineChart data={this.state.data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="1 1" />
              <Tooltip />
              <Legend />
              <Line type="curveLinier" dataKey="payments" stroke="#8884d8" />
              <Line type="curveLinier" dataKey="users" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
        <Typography type="title">Statistics</Typography>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'usersCount', 0)}</h2>
              <p>Total Participants</p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <h2 className={classes.number}>{get(appData, 'deletedUserCount', 0)}</h2>
              <p>Deleted Participants</p>
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
              <h2 className={classes.number}>{get(appData, 'verificationCount', 0)}</h2>
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
