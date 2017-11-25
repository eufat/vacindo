import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Profile from './Profile';
import Payment from './Payment';
import Ticket from './Ticket';
import Result from './Result';

class User extends Component {
  render() {
    const { history } = this.props;

    const sidebarItems = [
      {
        onClick: () => history.push('/user/profile'),
        text: 'Profile',
      },
      {
        onClick: () => history.push('/user/payment'),
        text: 'Payment',
      },
      {
        onClick: () => history.push('/user/ticket'),
        text: 'Ticket',
      },
      {
        onClick: () => history.push('/user/result'),
        text: 'Result',
      },
    ];

    return (
      <Dashboard sidebarItems={sidebarItems} {...this.props}>
        <Switch>
          <Route exact path="/user/" render={() => <Redirect to="/user/profile" />} />
          <Route exact path="/user/profile" component={Profile} />
          <Route exact path="/user/payment" component={Payment} />
          <Route exact path="/user/ticket" component={Ticket} />
          <Route exact path="/user/result" component={Result} />
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
