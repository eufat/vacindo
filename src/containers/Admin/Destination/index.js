import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import values from 'lodash/values';

import VacindoCard from '../../../components/VacindoCard';
import VacindoAddDestination from './components/VacindoAddDestination';

import { retrieveAdminDestinations } from '../actions';

const styleSheet = theme => ({
  button: {
    height: '100%',
    width: '100%',
  },
  addDestination: {
    padding: 0,
    height: 339.3,
  },
});

class Destination extends Component {
  state = {
    destinations: {},
    onAdd: false,
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    const { dispatch, currentUser } = this.props;

    if (currentUser.uid) {
      dispatch(retrieveAdminDestinations(currentUser.uid, (destinations) => {
        this.setState({
          destinations,
        });
      }));
    }
  }

  handleOnAdd = () => {
    this.setState({
      ...this.state,
      onAdd: true,
    });
  }

  handleCancelAdd = () => {
    this.setState({
      ...this.state,
      onAdd: false,
    });
  }

  render() {
    const Cards = [];
    const { classes } = this.props;
    const { onAdd } = this.state;

    const newDestinationComponent = () => {
      return (
        <Grid item xs={12} sm={4}>
          { onAdd ?
            <VacindoAddDestination {...this.props} handleCancelAdd={this.handleCancelAdd}/> :
            <Card className={classes.addDestination}>
              <Button
                className={classes.button}
                onClick={() => this.handleOnAdd()}
              >
                <Icon className={classes.icon} color="action" style={{ fontSize: 60 }}>add</Icon>
              </Button>
            </Card>
          }
        </Grid>
      );
    };

    Cards.push(newDestinationComponent());

    const data = values(this.state.destinations);

    data.forEach((item) => {
      const retrievedDestinationComponent = () => {
        return (
          <Grid item xs={12} sm={4}>
            <VacindoCard data={item} />
          </Grid>
        );
      };

      Cards.push(retrievedDestinationComponent());
    });

    return (
      <div>
        <div style={{ padding: 20 }}>
          <Typography type="title">Destinations</Typography>
          <Grid container spacing={16}>
            {Cards}
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, admin }) {
  return {
    currentUser: auth.currentUser,
    destinations: admin.destinations,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Destination));