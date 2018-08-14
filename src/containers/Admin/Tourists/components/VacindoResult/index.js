import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { SearchBox, Highlight, Pagination } from 'react-instantsearch/dom';

import { connectHits } from 'react-instantsearch/connectors';
import { getDate } from '../../../../../utils/numberHelper';

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
        <TableCell>{hit.userNumber}</TableCell>
        <TableCell>{getDate(hit.registeredTime)}</TableCell>
        <TableCell>
          <Highlight attributeName="firstName" hit={hit} />{' '}
          <Highlight attributeName="lastName" hit={hit} />
        </TableCell>
        <TableCell>
          <Highlight attributeName="examType" hit={hit} />
        </TableCell>
        <TableCell>
          <Highlight attributeName="email" hit={hit} />
        </TableCell>
        <TableCell>{hit.attendedTime > 0 ? 'Attended' : 'Not Attended'}</TableCell>
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
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Registration #</TableCell>
              <TableCell>Reg. Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Email</TableCell>
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

export default withStyles(styles)(ResultsTable);
