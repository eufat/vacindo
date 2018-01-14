import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';

import { InstantSearch, Hits, SearchBox, Highlight, RefinementList,
  Pagination, CurrentRefinements, ClearAll } from 'react-instantsearch/dom';
import { connectHits } from 'react-instantsearch/connectors';

import { deleteParticipant } from '../actions';
import { getDate } from '../../../utils/numberHelper';
import OrionDialog from '../../../components/OrionDialog';
import OrionForms from '../../Auth/components/OrionForms';

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

const Results = connectHits(({ hits, ...props }) => (
  <TableBody>
    {hits.map(hit => (
      <TableRow key={hit.userNumber}>
        <TableCell>
          {hit.userNumber}
        </TableCell>
        <TableCell>
          {getDate(hit.registeredTime)}
        </TableCell>
        <TableCell>
          <Highlight attributeName="firstName" hit={hit} />
          {' '}
          <Highlight attributeName="lastName" hit={hit} />
        </TableCell>
        <TableCell>
          <Highlight attributeName="examType" hit={hit} />
        </TableCell>
        <TableCell>
          {hit.attendedTime > 0 ? 'Attended' : 'Not Attended'}
        </TableCell>
        <TableCell>
          <Button onClick={() => props.onEdit(hit)}>Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
));

function ResultsTable(props) {
  const { classes } = props;

  return (
    <div>
      <SearchBox />
      {/* <ClearAll />
      <RefinementList attributeName="category" />
      <CurrentRefinements /> */}
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Registration #</TableCell>
              <TableCell>Reg. Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Attended</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <Results onEdit={props.onEdit} />
        </Table>
      </Paper>
      <Pagination />
    </div>
  );
}

ResultsTable.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

const OrionResult = withStyles(styles)(ResultsTable);


class Participants extends Component {
  state = {
    dialogOpen: false,
    editOpen: false,
    editData: {},
  }

  toggleEditDrawer = (state) => {
    this.setState({ ...this.state, editOpen: state });
  };

  handleDialogClose = () => {
    this.setState({ ...this.state, dialogOpen: false });
  };

  handleDialogOpen = () => {
    this.setState({ ...this.state, dialogOpen: true });
  };

  onEdit = (editData) => {
    this.setState({ ...this.state, editOpen: true, editData });
  };

  onDialogOk = () => {
    const { objectID } = this.state.editData;
    deleteParticipant(objectID);
    this.setState({ ...this.state, dialogOpen: false, editOpen: false });
  };

  render() {
    const { appData } = this.props;

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
        <Drawer anchor="right" open={this.state.editOpen} onRequestClose={() => this.toggleEditDrawer(false)}>
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

Participants.propTypes = {
  appData: PropTypes.object,
};

Participants.defaultProps = {
  appData: {},
};

function mapStateToProps({ admin }) {
  return {
    appData: admin.appData,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Participants));
