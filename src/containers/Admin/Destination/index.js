import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import values from 'lodash/values';

import VacindoCard from '../../../components/VacindoCard';
import VacindoAddDestination from './components/VacindoAddDestination';

import { retrieveAdminDestinations } from '../actions';

class Destination extends Component {
  state = {
    destinations: {},
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

  render() {
    const Cards = [];

    Cards.push(<Grid item xs={12} sm={6}>
      <VacindoAddDestination {...this.props} />
               </Grid>);

    const data = values(this.state.destinations);

    data.forEach((item) => {
      Cards.push(<Grid item xs={12} sm={6}>
        <VacindoCard data={item} />
                 </Grid>);
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

export default connect(mapStateToProps)(Destination);
