import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ErrorOutline from 'material-ui-icons/ErrorOutline';

import OrionStepButtons from '../components/OrionStepButtons';

import { fetchUserData, updateDaySelection, checkDaySelection, fetchPaymentData, watchSelectionCount } from '../actions';
import OrionMessage from '../../../components/OrionMessage'

const styleSheet = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: theme.spacing.unit * 3,
  }),
  icon: {
    height: 64,
    width: 64,
    margin: theme.spacing.unit,
  },
  dayPaper: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 16,
    paddingRight: 16,
    margin: theme.spacing.unit,
  },
  ticketTable: {
    tableLayout: 'fixed',
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid grey',
  },
  tableData: {
    padding: 20,
  },
});

class Ticket extends Component {
  state = {
    isPaymentVerified: false,
    ipaSabtu: 0,
    form: {
      userId: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      school: '',
      location: '',
      examType: '',
      referral: '',
      paymentId: '',
      userNumber: '',
      verificationTime: '',
      daySelection: '',
    },
  };

  componentDidMount() {
    this.setUserDataToState();
    this.watchIpaSabtuToState();
  }

  
  setUserDataToState = async () => {
    const userId = this.props.user.uid;
    let userData = await fetchUserData(userId);
    userData = { ...userData, userId };
    this.setState({
      form: { ...this.state.form, ...userData },
    }, () => this.checkIfPaymentVerified());
  };

  setDaySelectionToState = async () => {
    const userId = this.props.user.uid;
    const daySelection = await checkDaySelection(userId);
    const prevForm = this.state.form;
    this.setState({
      ...this.state,
      form: {
        ...prevForm,
        daySelection,
      },
    });
  }

  watchIpaSabtuToState = () => {
    const watchIpaSabtu = callback => watchSelectionCount('ipa', 'sabtu', callback);
    watchIpaSabtu(val => this.setState({ ...this.state, ipaSabtu: val }));
  }

  checkIfPaymentVerified = async () => {
    const paymentData = await fetchPaymentData(this.state.form.paymentId);
    if (paymentData) {
      this.setState({ ...this.state, isPaymentVerified: paymentData.verificationTime > 0 });
    }
    return false;
  }

  handleDaySelect = (day) => {
    const { dispatch } = this.props;
    const callback = async () => {
      this.setDaySelectionToState();
    };

    dispatch(updateDaySelection(this.state.form.userId, this.state.form.examType, day, callback));
  }

  render() {
    const { classes } = this.props;

    const toUpperCase = (str) => str.toUpperCase();

    const sabtuText = 'Sabtu, 24 February 2018 at Gelanggang Remaja Pasar Minggu';
    const mingguText = 'Minggu, 25 February 2018 at Gelanggang Remaja Pasar Minggu';

    const dayText = (day) => {

      if (day === 'sabtu') {
        return sabtuText;
      }

      if (day === 'minggu') {
        return mingguText;
      }
    }

    const DayButtonSelect = (day, disabler) => {
      return (
        <center>
          <Button
            raised
            onClick={() => this.handleDaySelect(day)}
            color="primary"
            disabled={disabler}
          >
            Select This Day ({day})
          </Button>
        </center>
      );
    };

    const DaySelectIpa = () => {
      return (
        <div className={classes.verified}>
          <Paper className={classes.dayPaper}>
            <Typography type="headline" gutterBottom align="center">
              { sabtuText }
            </Typography>
            { DayButtonSelect('sabtu', this.state.ipaSabtu >= 900) }
            <br />
            <Typography type="caption" gutterBottom align="center">
              Quota { this.state.ipaSabtu } / 900
            </Typography>
          </Paper>
          <Paper className={classes.dayPaper}>
            <Typography type="headline" gutterBottom align="center">
              { mingguText}
            </Typography>
            { DayButtonSelect('minggu', false) }
            <br />
            <Typography type="caption" gutterBottom align="center">
              Quota ∞
            </Typography>
          </Paper>
        </div>
      );
    };

    const DaySelectIps = () => {
      return (
        <div className={classes.verified}>
          <Paper className={classes.dayPaper}>
            <Typography type="headline" gutterBottom align="center">
              { mingguText }
            </Typography>
            { DayButtonSelect('minggu', false) }
          </Paper>
        </div>
      );
    };

    const tableDataStyle = { padding: '10px' };

    function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    const TicketView = () => {
      const examNum = `00000${this.state.form.examType === 'ipa' ? 0 : 1}${this.state.form.daySelection === 'sabtu' ? 0 : 1}${pad(this.state.form.userNumber, 4)}`;
      return (
        <div className={this.props.classes.ticket}>
          <center>
            <img src="/static/images/logo.jpg" alt="logo" width={150} /><br />
            <QRCode value={this.state.form.userId} size={300} /><br />
            <code>UID: {this.state.form.userId}</code><br />
            <code>PID: {this.state.form.paymentId}</code><br />
          </center>
          <br />
          <table className={this.props.classes.ticketTable}>
            <tr>
              <td style={tableDataStyle}>First Name</td>
              <td style={tableDataStyle}>{this.state.form.firstName}</td>
            </tr>
            <tr>
              <td style={tableDataStyle}>Last Name</td>
              <td style={tableDataStyle}>{this.state.form.lastName}</td>
            </tr>
            <tr>
              <td style={tableDataStyle}>Email</td>
              <td style={tableDataStyle}>{this.state.form.email}</td>
            </tr>
            <tr>
              <td style={tableDataStyle}>Exam Type</td>
              <td style={tableDataStyle}>{toUpperCase(this.state.form.examType)}</td>
            </tr>
            <tr>
              <td style={tableDataStyle}>Exam Num.</td>
              <td style={tableDataStyle}>{examNum}</td>
            </tr>
            <tr>
              <td style={tableDataStyle}>Exam Date</td>
              <td style={tableDataStyle}>{dayText(this.state.form.daySelection)}</td>
            </tr>
          </table>
          <br />
          <OrionMessage>
            Tunjukkan e-tiket ini di mobile web saat check-in event. Pastikan kode QR dan logo dapat ditampilkan dengan jelas.
          </OrionMessage>
          <br />
          <OrionMessage>
            Mencetak tiket tidak wajib, tapi di anjurkan.
            Apabila kamu mengkhawatirkan hal-hal yang dapat membuat kamu tidak dapat menampilkan tiket (seperti handphone mati dsb), kami merekomendasikan untuk mencetak tiket ini.
          </OrionMessage>
          <br />
          <br />
          <Button onClick={() => window.print()} raised>Print Ticket</Button>
          <br />
          <br />
        </div>
      );
    };

    return (
      <div>
        <Typography type="headline">Ticket</Typography>
        { this.state.form.paymentId && this.state.isPaymentVerified ?
          <div>
            { this.state.form.daySelection.length > 0 ?
              <div>
                { TicketView() }
              </div>
              :
              <div>
                <center>
                  <Typography type="title" align="center">Select Tryout Time</Typography>
                </center>
                { this.state.form.examType === 'ipa' ? DaySelectIpa() : DaySelectIps() }
              </div>
            }
          </div>
        :
          <div>
            <div className={this.props.classes.container}>
              <center><ErrorOutline className={this.props.classes.icon} /></center>
              <center>Tryout Ticket Not Found or Not yet Generated.</center>
            </div>
          </div>
        }
        <OrionStepButtons nextLink="/user/result" beforeLink="/user/payment" />
      </div>
    );
  }
}

Ticket.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.currentUser,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Ticket));
