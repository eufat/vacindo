import map from 'lodash/map';

import React from 'react';
import PropTypes from 'prop-types';
import { PagingState, SortingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { TableCell } from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';


import VacindoDialog from '../../../../../components/VacindoDialog';
import { VacindoLoading } from '../../../../../components/VacindoLoading';
import VacindoForms from '../../../../Auth/components/VacindoForms';

import { getDate } from '../../../../../utils/numberHelper';
import { retrieveParticipants, deleteParticipant } from '../../../actions';

const styles = {
  saleAmountCell: {
    textAlign: 'right',
  },
  noDataCell: {
    textAlign: 'center',
    padding: '40px 0',
  },
};

const NameCellBase = ({ row }) => <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>;

NameCellBase.propTypes = {
  row: PropTypes.object.isRequired,
};

const NameCell = NameCellBase;

const DateCellBase = ({ row }) => <TableCell>{`${getDate(row.registeredTime)}`}</TableCell>;

DateCellBase.propTypes = {
  row: PropTypes.object.isRequired,
};

const DateCell = DateCellBase;

const EditCellBase = ({ onEdit, row }) => (
  <TableCell>
    <Button onClick={() => onEdit(row.uid)}>Edit</Button>
  </TableCell>
);

EditCellBase.propTypes = {
  row: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const EditCell = EditCellBase;

const NoDataCellBase = ({ loading, colSpan, classes }) => (
  <TableCell className={classes.noDataCell} colSpan={colSpan}>
    <big>{loading ? '' : 'No data'}</big>
  </TableCell>
);

NoDataCellBase.propTypes = {
  loading: PropTypes.bool.isRequired,
  colSpan: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

const NoDataCell = withStyles(styles, { name: 'RemoteDataDemo' })(NoDataCellBase);

const styleSheet = theme => ({
  editData: {
    padding: 16,
    width: 400,
  },
});

class VacindoTable extends React.PureComponent {
  state = {
    columns: [
      { name: 'userNumber', title: 'Registration #' },
      { name: 'registeredTime', title: 'Reg. Date' },
      { name: 'name', title: 'Name' },
      { name: 'examType', title: 'Exam Type' },
      { name: 'attended', title: 'Attended' },
      { name: 'edit', title: 'Edit' },
    ],
    rows: [],
    sorting: [{ columnName: 'userNumber', direction: 'asc' }],
    totalCount: 0,
    pageSize: 10,
    allowedPageSizes: [5, 10, 20, 50],
    currentPage: 0,
    loading: true,
    editOpen: false,
    dialogOpen: false,
    editData: {},
    dataOnPage: {},
  };

  componentDidMount() {
    this.fetchData();
  }

  onDialogOk = () => {
    const { uid } = this.state.editData;
    deleteParticipant(uid);
    this.setState({ ...this.state, dialogOpen: false, editOpen: false }, () => this.fetchData());
  };

  onEdit = (uid) => {
    let dataOnPage = this.state.dataOnPage;
    const editData = { ...dataOnPage[uid], uid };
    this.setState({ ...this.state, editOpen: true, editData });
  };

  setRows = (participants, rows) => {
    const totalCount = this.props.participantsCount;
    this.setState({
      ...this.state,
      loading: false,
      rows,
      totalCount,
      dataOnPage: participants,
    });
  };

  handleDialogClose = () => {
    this.setState({ ...this.state, dialogOpen: false });
  };

  handleDialogOpen = () => {
    this.setState({ ...this.state, dialogOpen: true });
  };

  queryString() {
    const { sorting, pageSize, currentPage } = this.state;

    let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;

    const columnSorting = sorting[0];
    if (columnSorting) {
      const sortingDirectionString = columnSorting.direction === 'desc' ? ' desc' : '';
      queryString = `${queryString}&orderby=${columnSorting.columnName}${sortingDirectionString}`;
    }

    return queryString;
  }

  changeCurrentPage = (currentPage) => {
    this.setState({
      loading: true,
      currentPage,
    }, () => this.fetchData());
  };

  changeSorting = (sorting) => {
    this.setState({
      loading: true,
      sorting,
    });
  };

  fetchData() {
    const { pageSize, currentPage, sorting } = this.state;
    retrieveParticipants(
      currentPage * pageSize,
      currentPage * pageSize + pageSize,
      sorting.columnName,
    ).then((participants) => {
      const rows = map(participants, (value, uid) => ({ ...value, uid }));
      this.setRows(participants, rows);
    });
  }

  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data =>
        this.setState({
          rows: data.items,
          totalCount: data.totalCount,
          loading: false,
        }),
      )
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  toggleEditDrawer = (state) => {
    this.setState({ ...this.state, editOpen: state });
  };
  render() {
    const {
      rows,
      columns,
      sorting,
      pageSize,
      allowedPageSizes,
      currentPage,
      totalCount,
      loading,
      editOpen,
      editData,
    } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        <VacindoDialog
          dialogTitle='Delete User'
          dialogText='Are you sure you want to delete this user?'
          open={this.state.dialogOpen}
          onOk={this.onDialogOk}
          onCancel={this.handleDialogClose}
          handleClose={this.handleDialogClose}
        />
        <Drawer anchor="right" open={editOpen} onRequestClose={() => this.toggleEditDrawer(false)}>
          <div className={this.props.classes.editData}>
            <VacindoForms
              changeFormFields={noop => noop}
              changeFormSelect={noop => noop}
              forms={editData}
              disabled
            />
            <br />
            <Button onClick={this.handleDialogOpen}>Delete User</Button>
          </div>
        </Drawer>
        <Grid rows={rows} columns={columns}>
          <SortingState sorting={sorting} onSortingChange={this.changeSorting} />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
            totalCount={totalCount}
          />
          <TableView
            tableCellTemplate={({ row, column }) => {
              if (column.name === 'name') {
                return <NameCell row={row} />;
              }
              if (column.name === 'registeredTime') {
                return <DateCell row={row} />;
              }
              if (column.name === 'edit') {
                return <EditCell row={row} onEdit={this.onEdit} />;
              }
              return undefined;
            }}
            tableNoDataCellTemplate={({ colSpan }) => (
              <NoDataCell loading={loading} colSpan={colSpan} />
            )}
          />
          <TableHeaderRow allowSorting />
          <PagingPanel allowedPageSizes={allowedPageSizes} />
        </Grid>
        {loading && <VacindoLoading />}
      </div>
    );
  }
}

export default withStyles(styleSheet)(VacindoTable);
