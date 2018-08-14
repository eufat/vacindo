import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

import VacindoAppbar from './components/VacindoAppbar';
import VacindoSidebar from './components/VacindoSidebar/index';

import { checkAuthentication } from '../Auth/actions';

import isMobile from '../../utils/mobileCheck';

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
});

class Dashboard extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(checkAuthentication(history));
    this.mobileCheck();
  }

  mobileCheck = () => {
    this.setState({ open: !isMobile() });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <VacindoAppbar {...this.state} handleDrawerOpen={this.handleDrawerOpen} />
        <VacindoSidebar
          {...this.props}
          {...this.state}
          handleDrawerClose={this.handleDrawerClose}
        />
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(withStyles(styleSheet)(Dashboard));
