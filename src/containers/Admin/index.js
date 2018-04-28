import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Monitoring from './Monitoring';
import Participants from './Participants';

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
        onClick: () => history.push('/admin/monitoring'),
        text: 'Monitoring',
      },
      {
        onClick: () => history.push('/admin/participants'),
        text: 'Participants',
      },
      {
        onClick: () => history.push('/admin/payments'),
        text: 'Payments',
      },
      {
        onClick: () => history.push('/admin/scanner'),
        text: 'Scanner',
      },
      {
        onClick: () => history.push('/admin/results'),
        text: 'Results',
      },
      {
        onClick: () => history.push('/admin/settings'),
        text: 'Settings',
      },
    ];

    return (
      <Dashboard sidebarItems={sidebarItems} {...this.props}>
        <Switch>
          <Route exact path="/admin/" render={() => <Redirect to="/admin/monitoring" />} />
          <Route exact path="/admin/monitoring" component={Monitoring} />
          <Route exact path="/admin/participants" component={Participants} />
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
