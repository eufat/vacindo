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
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';

import { OrionLoading } from '../../../../../components/OrionLoading';
import OrionForms from '../../../../Auth/components/OrionForms';

import { getDate } from '../../../../../utils/numberHelper';
import { retrievePayments } from '../../../actions';
import { retrieveParticipant } from '../../../actions';

const styles = {
  saleAmountCell: {
    textAlign: 'right',
  },
  noDataCell: {
    textAlign: 'center',
    padding: '40px 0',
  },
};

const DateCellBase = ({ time }) => <TableCell>{`${time > 0 ? getDate(time) : 'No date'}`}</TableCell>;

DateCellBase.propTypes = {
  time: PropTypes.number.isRequired,
};

const DateCell = DateCellBase;

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

const VerifyCellBase = ({ onVerify, row }) => (
  <TableCell>
    <Button onClick={() => onVerify(row.paymentId)}>Verify</Button>
  </TableCell>
);

VerifyCellBase.propTypes = {
  row: PropTypes.object.isRequired,
  onVerify: PropTypes.func.isRequired,
};

const VerifyCell = VerifyCellBase;

const styleSheet = theme => ({
  editData: {
    padding: 16,
    width: 400,
  },
});

class OrionTable extends React.PureComponent {
  state = {
    columns: [
      { name: 'paymentNumber', title: 'Registration #' },
      { name: 'method', title: 'Method' },
      { name: 'creationTime', title: 'Created' },
      { name: 'verificationTime', title: 'Verification' },
      { name: 'verify', title: 'Verify' },
    ],
    rows: [],
    sorting: [{ columnName: 'paymentNumber', direction: 'asc' }],
    totalCount: 0,
    pageSize: 10,
    allowedPageSizes: [5, 10, 15],
    currentPage: 0,
    loading: true,
    verifyOpen: false,
    verifyData: {},
    dataOnPage: {},
    userData: {},
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    this.fetchData();
  }
  changeCurrentPage = (currentPage) => {
    this.setState({
      loading: true,
      currentPage,
    });
  };
  changePageSize = (pageSize) => {
    const totalPages = Math.ceil(this.state.totalCount / pageSize);
    const currentPage = Math.min(this.state.currentPage, totalPages - 1);

    this.setState({
      loading: true,
      pageSize,
      currentPage,
    });
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
  setRows = (payments, rows) => {
    const totalCount = this.props.paymentsCount;
    this.setState({
      ...this.state,
      loading: false,
      rows,
      totalCount,
      dataOnPage: payments,
    });
  };
  changeSorting = (sorting) => {
    this.setState({
      loading: true,
      sorting,
    });
  };
  async fetchData() {
    const { pageSize, currentPage, sorting } = this.state;
    let payments = {};
    try {
      payments = await retrievePayments(
        currentPage * pageSize,
        currentPage * pageSize + pageSize,
        sorting.columnName,
      );
    } finally {
      const rows = map(payments, (value, paymentId) => ({ ...value, paymentId }));
      this.setRows(payments, rows);
    }
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
  onVerify = async (paymentId) => {
    const dataOnPage = this.state.dataOnPage;
    const userId = dataOnPage[paymentId].userId;
    const userData = await retrieveParticipant(userId);
    this.setState({ ...this.state, verifyOpen: true, verifyData: dataOnPage[paymentId], userData });
  };
  toggleEditDrawer = (state) => {
    this.setState({ ...this.state, verifyOpen: state });
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
      userData,
      verifyOpen,
    } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <Drawer
          anchor="right"
          open={verifyOpen}
          onRequestClose={() => this.toggleEditDrawer(false)}
        >
          <div className={this.props.classes.editData}>
            <OrionForms
              changeFormFields={noop => noop}
              changeFormSelect={noop => noop}
              forms={userData}
              disabled
            />
            <br />
            <Button disabled>Verify Payment</Button>
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
              if (column.name === 'verificationTime') {
                return <DateCell row={row} time={row.verificationTime} />;
              }
              if (column.name === 'creationTime') {
                return <DateCell row={row} time={row.creationTime} />;
              }
              if (column.name === 'verify') {
                return <VerifyCell row={row} onVerify={this.onVerify} />;
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
        {loading && <OrionLoading />}
      </div>
    );
  }
}

export default withStyles(styleSheet)(OrionTable);
