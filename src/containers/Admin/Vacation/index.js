import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import dummy from '../../../dummy.json';
import VacindoCard from '../../../components/VacindoCard';
import VacindoAddVacation from './components/VacindoAddVacation';

let { data } = dummy;
data = data.slice(0, 1);

class Vacation extends Component {
  state = {};

  render() {
    const Cards = [];

    data.forEach((item) => {
      Cards.push(<Grid item xs={12} sm={6}>
        <VacindoCard data={item} />
                 </Grid>);
    });

    Cards.push(<Grid item xs={12} sm={6}><VacindoAddVacation /></Grid>);

    return (
      <div>
        <div style={{ padding: 20 }}>
          <Grid container spacing={16}>
            {Cards}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Vacation;
