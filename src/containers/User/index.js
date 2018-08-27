import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Account from './Account';
import Explore from './Explore';
import Booking from './Booking';
import Payment from './Payment';

class User extends Component {
  state = {}

  render() {
    const { history } = this.props;

    const sidebarItems = [
      {
        onClick: () => history.push('/user/explore'),
        text: 'Explore',
      },
      {
        onClick: () => history.push('/user/booking'),
        text: 'Booking',
      },
      {
        onClick: () => history.push('/user/payment'),
        text: 'Payment',
      },
      {
        onClick: () => history.push('/user/account'),
        text: 'Account',
      },
    ];

    return (
      <Dashboard sidebarItems={sidebarItems} {...this.props}>
        <Switch>
          <Route exact path="/user/" render={() => <Redirect to="/user/explore" />} />
          <Route exact path="/user/account" component={Account} />
          <Route exact path="/user/explore" component={Explore} />
          <Route exact path="/user/booking" component={Booking} />
          <Route exact path="/user/payment" component={Payment} />
        </Switch>
      </Dashboard>
    );
  }
}

User.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(User);
