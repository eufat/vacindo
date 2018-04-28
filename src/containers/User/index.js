import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Profile from './Profile';

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
    ];

    return (
      <Dashboard sidebarItems={sidebarItems} {...this.props}>
        <Switch>
          <Route exact path="/user/" render={() => <Redirect to="/user/profile" />} />
          <Route exact path="/user/profile" component={Profile} />
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
