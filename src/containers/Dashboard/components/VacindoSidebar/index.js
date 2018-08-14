import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { closeAuthentication } from '../../../Auth/actions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class VacindoSidebar extends Component {
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes, dispatch, sidebarItems, history, handleDrawerClose, open
    } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List disablePadding className={classes.sidebar}>
          {sidebarItems.map(sidebarItem => (
            <ListItem button onClick={() => sidebarItem.onClick()}>
              <ListItemText primary={sidebarItem.text} />
            </ListItem>
          ))}
          <Divider className={classes.divider} />
          <ListItem>
            <Button
              onClick={() => dispatch(closeAuthentication(() => history.push('/')))}
              className={classes.button}
            >
              Sign Out
            </Button>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

VacindoSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  sidebarItems: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(VacindoSidebar);
