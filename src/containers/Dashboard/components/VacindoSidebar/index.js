import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import { closeAuthentication } from '../../../Auth/actions';

const styleSheet = theme => ({
  drawerInner: {
    position: 'relative',
    height: 'auto',
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  button: {
    margin: 5,
  },
  divider: {
    marginTop: 100,
  },
});

const VacindoSidebar = props => (
  <Drawer open={props.open} type="persistent">
    <div className={props.classes.drawerInner}>
      <div className={props.classes.drawerHeader}>
        <IconButton onClick={() => props.handleDrawerClose()}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List disablePadding className={props.classes.sidebar}>
        {props.sidebarItems.map(sidebarItem => (
          <ListItem button onClick={() => sidebarItem.onClick()}>
            <ListItemText primary={sidebarItem.text} />
          </ListItem>
        ))}
        <Divider className={props.classes.divider} />
        <ListItem>
          <Button
            onClick={() => props.dispatch(closeAuthentication(() => props.history.push('/')))}
            className={props.classes.button}
          >
            Sign Out
          </Button>
        </ListItem>
      </List>
    </div>
  </Drawer>
);

VacindoSidebar.propTypes = {
  sidebarItems: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(withStyles(styleSheet)(VacindoSidebar));
