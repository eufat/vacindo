import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { InstantSearch, Hits, SearchBox, Highlight, RefinementList,
  Pagination, CurrentRefinements, ClearAll } from 'react-instantsearch/dom';
import { connectHits } from 'react-instantsearch/connectors';

import { getDate } from '../../../utils/numberHelper';
import OrionDialog from '../../../components/OrionDialog';

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
  }
});

const Results = connectHits(({ hits }) => (
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
          <Highlight attributeName="email" hit={hit} />
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
      <ClearAll />
      <RefinementList attributeName="category" />
      <CurrentRefinements />
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Registration #</TableCell>
              <TableCell>Reg. Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <Results />
        </Table>
      </Paper>
      <Pagination />
    </div>
  );
}

ResultsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const OrionResult = withStyles(styles)(ResultsTable);


function Participants(props) {
  const { appData } = props;

  return (
    <div>
      <Typography type="title">Participants</Typography>
      <br />
      <InstantSearch
        appId="5RPGT77LXQ"
        apiKey="79e4781eb496813e9c371534bef88d8c"
        indexName="users"
      >
        <OrionResult />
      </InstantSearch>
    </div>
  );
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
