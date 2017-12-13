import map from 'lodash/map';
import get from 'lodash/get';

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
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Close from 'material-ui-icons/Close';

import { OrionLoading } from '../../../../../components/OrionLoading';
import OrionForms from '../../../../Auth/components/OrionForms';

import { getDate } from '../../../../../utils/numberHelper';
import {
  retrievePayments,
  retrieveParticipant,
  retrievePaymentImageURL,
  retrievePayment,
  verifyPayment,
  deletePayment,
} from '../../../actions';

const styles = {
  saleAmountCell: {
    textAlign: 'right',
  },
  noDataCell: {
    textAlign: 'center',
    padding: '40px 0',
  },
};

const VerifiedCellBase = ({ time }) => <TableCell>{`${time > 0 ? 'Verified' : 'Not verified'}`}</TableCell>;

VerifiedCellBase.propTypes = {
  time: PropTypes.number.isRequired,
};

const VerifiedCell = VerifiedCellBase;

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paymentImage: {
    maxWidth: '100%',
    maxHeight: '400px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
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
    allowedPageSizes: [5, 10, 20, 50],
    currentPage: 0,
    loading: true,
    verifyOpen: false,
    verifyOnLoad: true,
    verifyData: {},
    dataOnPage: {},
    userData: {},
    paymentImageURL: '',
    paymentData: {}
  };
  componentDidMount() {
    this.fetchData();
  };
  changeCurrentPage = (currentPage) => {
    this.setState({
      loading: true,
      currentPage,
    }, () => this.fetchData());
  };
  changePageSize = (pageSize) => {
    const totalPages = Math.ceil(this.state.totalCount / pageSize);
    const currentPage = Math.min(this.state.currentPage, totalPages - 1);

    this.setState({
      loading: true,
      pageSize,
      currentPage,
    }, () => this.fetchData());
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
    } catch (error) {
      console.error(error.message);
    }

    const rows = map(payments, (value, paymentId) => ({ ...value, paymentId }));
    this.setRows(payments, rows);
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

  onVerify = (paymentId) => {
    this.setState({ ...this.state, verifyOpen: true, verifyOnLoad: true }, () => this.setVerifyData(paymentId));
  };

  setVerifyData = async (paymentId) => {
    const dataOnPage = this.state.dataOnPage;
    const userId = dataOnPage[paymentId].userId;
    let userData = {};
    let paymentImageURL = '';
    let paymentData = {};

    try {
      userData = await retrieveParticipant(userId);
      userData = { ...userData, userId };
    } catch (error) {
      console.error(error.message);
    }

    try {
      paymentImageURL = await retrievePaymentImageURL(userId);
    } catch (error) {
      console.error(error.message);
    }

    try {
      paymentData = await retrievePayment(paymentId);
      paymentData = { ...paymentData, paymentId };
    } catch (error) {
      console.error(error.message);
    }

    this.setState({
      ...this.state,
      verifyOnLoad: false,
      verifyData: dataOnPage[paymentId],
      userData,
      paymentImageURL,
      paymentData,
    });
  };

  handleDeletePayment = () => {
    deletePayment(this.state.paymentData.paymentId, this.state.userData.userId);
    this.toggleEditDrawer(false);
    this.fetchData();
  }

  handleVerifyPayment = () => {
    const now = Date.now();
    const paymentId = this.state.paymentData.paymentId;

    verifyPayment(paymentId, now);
    this.fetchData();
    this.onVerify(paymentId);
  }

  handleUnverifyPayment = () => {
    // Unverify with timestamp ''
    const paymentId = this.state.paymentData.paymentId;

    verifyPayment(paymentId, '');
    this.fetchData();
    this.onVerify(paymentId);
  }

  toggleEditDrawer = (state) => {
    this.setState({ ...this.state, verifyOpen: state });
  };
  render() {
    const { classes } = this.props;
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
      paymentImageURL,
    } = this.state;

    let i = 0;

    const formatMsToDate = (ms) => {
      if (ms === 0) {
        return '-';
      }

      return (new Date(ms)).toString();
    };
    const isVerified = this.state.paymentData.verificationTime > 0;

    const PaymentContent = paymentData => (
      <div>
        <Typography type="body1">
          Created Date  : {get(paymentData, 'creationTime', '')} <br />
          Method  : {get(paymentData, 'method', '')} <br />
          Payment Number  : {get(paymentData, 'paymentNumber', '')} <br />
          Verification Status: {isVerified ? 'Verified' : 'Not verified'} <br />
          Verification Date  : {formatMsToDate(get(paymentData, 'verificationTime', ''))} <br />
          {
            get(paymentData, 'method') === 'transfer' ?
              <div>
                Bank Account  : {get(paymentData, 'data.bankAccount', '')} <br />
                Bank Name  : {get(paymentData, 'data.bankName', '')} <br />
                Transfer Amount : {get(paymentData, 'data.transferAmount', '')} <br />
                Transfer Date  : {get(paymentData, 'data.transferDate', '')} <br />
                Transferors  : {get(paymentData, 'data.transferors', '')} <br />
              </div> :
              <div>
                Voucher Code  : {get(paymentData, 'data.code', '')} <br />
              </div>
          }
        </Typography>
      </div>
    );

    const DrawerContent = () => (
      <div>
        <IconButton dense onClick={() => this.toggleEditDrawer(false)}>
          <Close className={classes.leftIcon} />
        </IconButton>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>User Info</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <OrionForms
              changeFormFields={noop => noop}
              changeFormSelect={noop => noop}
              forms={userData}
              disabled
              key={`form-${i++}`}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Payment Image</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {
              this.state.paymentImageURL === '' ?
                <Typography type="body1" gutterBottom align="center">
                  No payment image.
                </Typography> :
                <img src={paymentImageURL} className={classes.paymentImage} alt="Payment URL" />
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Payment Info</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { PaymentContent(this.state.paymentData) }
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button dense onClick={() => this.handleDeletePayment()}>
              Delete
            </Button>
            <Button dense onClick={() => this.handleUnverifyPayment()} disabled={!isVerified}>
              Unverify
            </Button>
            <Button dense onClick={() => this.handleVerifyPayment()} color="primary" disabled={isVerified}>
              Verify
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );

    return (
      <div style={{ position: 'relative' }}>
        <Drawer
          anchor="right"
          open={verifyOpen}
          onRequestClose={() => this.toggleEditDrawer(false)}
        >
          <div className={this.props.classes.editData}>
          {
            this.state.verifyOnLoad ?
              <CircularProgress /> :
              <div>{ DrawerContent() }</div>
          }
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
                return <VerifiedCell row={row} time={row.verificationTime} />;
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
