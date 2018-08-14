import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const styleSheet = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: 'white',
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
});

const VacindoAppbar = props => (
  <AppBar className={props.classes.appBar}>
    <Toolbar disableGutters={!props.open}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={() => props.handleDrawerOpen()}
        className={props.classes.navIconHide}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit">
        Vacindo App
      </Typography>
    </Toolbar>
  </AppBar>
);

VacindoAppbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styleSheet)(VacindoAppbar);
