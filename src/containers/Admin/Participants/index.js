import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';

import { InstantSearch } from 'react-instantsearch/dom';

import { deleteParticipant } from '../actions';
import OrionDialog from '../../../components/OrionDialog';
import OrionForms from '../../Auth/components/OrionForms';
import OrionResult from './components/OrionResult';

// import OrionTable from './components/OrionTable';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  editData: {
    padding: 16,
    width: 400,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Participants extends Component {
  state = {
    dialogOpen: false,
    editOpen: false,
    editData: {},
  };

  onDialogOk = () => {
    const { objectID } = this.state.editData;
    deleteParticipant(objectID);
    this.setState({ ...this.state, dialogOpen: false, editOpen: false });
  };

  onEdit = (editData) => {
    this.setState({ ...this.state, editOpen: true, editData });
  };

  handleDialogOpen = () => {
    this.setState({ ...this.state, dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ ...this.state, dialogOpen: false });
  };

  toggleEditDrawer = (state) => {
    this.setState({ ...this.state, editOpen: state });
  };

  render() {
    return (
      <div>
        <OrionDialog
          dialogTitle="Delete User"
          dialogText="Are you sure you want to delete this user?"
          open={this.state.dialogOpen}
          onOk={this.onDialogOk}
          onCancel={this.handleDialogClose}
          handleClose={this.handleDialogClose}
        />
        <Drawer
          anchor="right"
          open={this.state.editOpen}
          onRequestClose={() => this.toggleEditDrawer(false)}
        >
          <div className={this.props.classes.editData}>
            <IconButton dense onClick={() => this.toggleEditDrawer(false)}>
              <Close className={this.props.classes.leftIcon} />
            </IconButton>
            <OrionForms
              changeFormFields={noop => noop}
              changeFormSelect={noop => noop}
              forms={this.state.editData}
              disabled
            />
            <br />
            <Button onClick={this.handleDialogOpen}>Delete User</Button>
          </div>
        </Drawer>
        <Typography type="title">Participants</Typography>
        <br />
        <InstantSearch
          appId="5RPGT77LXQ"
          apiKey="79e4781eb496813e9c371534bef88d8c"
          indexName="users"
        >
          <OrionResult onEdit={this.onEdit} />
        </InstantSearch>
      </div>
    );
  }
}

export default withStyles(styles)(Participants);
