import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Monitoring from './Monitoring';
import Participants from './Participants';
import Payments from './Payments';
import Results from './Results';
import Settings from './Settings';

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
          <Route exact path="/admin/payments" component={Payments} />
          <Route exact path="/admin/results" component={Results} />
          <Route exact path="/admin/settings" component={Settings} />
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
