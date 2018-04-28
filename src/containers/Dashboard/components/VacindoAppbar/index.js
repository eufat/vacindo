import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';

const drawerWidth = 240;

const styleSheet = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
});

const VacindoAppbar = props => (
  <AppBar className={classNames(props.classes.appBar, props.open && props.classes.appBarShift)}>
    <Toolbar disableGutters={!props.open}>
      <IconButton
        color="contrast"
        aria-label="open drawer"
        onClick={() => props.handleDrawerOpen()}
        className={classNames(props.classes.menuButton, props.open && props.classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography type="title" color="inherit" noWrap>
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