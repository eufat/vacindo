import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Destination from './Destination';
import Payments from './Payments';

import { retrieveAppData } from './actions';

class Admin extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(retrieveAppData());
  }

  render() {
    const { history } = this.props;

    const sidebarItems = [
      {
        onClick: () => history.push('/admin/destination'),
        text: 'Destination',
      },
      {
        onClick: () => history.push('/admin/payments'),
        text: 'Payments',
      },
      {
        onClick: () => history.push('/admin/settings'),
        text: 'Settings',
      },
    ];

    return (
      <Dashboard sidebarItems={sidebarItems} {...this.props}>
        <Switch>
          <Route exact path="/admin/" render={() => <Redirect to="/admin/destination" />} />
          <Route exact path="/admin/destination" component={Destination} />
          <Route exact path="/admin/payments" component={Payments} />
        </Switch>
      </Dashboard>
    );
  }
}

Admin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Admin);
