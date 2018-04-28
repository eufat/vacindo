import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';

import VacindoAppbar from './components/VacindoAppbar';
import VacindoSidebar from './components/VacindoSidebar';

import { checkAuthentication } from '../Auth/actions';

import isMobile from '../../utils/mobileCheck';

const drawerWidth = 240;

const styleSheet = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    marginLeft: 0,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    width: 'calc(100% - 240px)',
    marginLeft: drawerWidth,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
      <div>
        <VacindoAppbar {...this.state} handleDrawerOpen={this.handleDrawerOpen} />
        <VacindoSidebar {...this.props} {...this.state} handleDrawerClose={this.handleDrawerClose} />
        <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
          {this.props.children}
        </main>
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
