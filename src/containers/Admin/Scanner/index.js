import mapKeys from 'lodash/mapKeys';

import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Slide from 'material-ui/transitions/Slide';
import { retrieveParticipant, retrievePayment, attendParticipant } from '../actions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Scanner extends Component {
  state = {
    delay: 100,
    userId: '',
    open: false,
    userData: {},
    paymentData: {},
  };

  handleScan = (data) => {
    if (data) {
      this.setState(
        {
          userId: data,
        },
        () => this.retrieveData(data),
      );
    }
  };

  retrieveData = async (userId) => {
    const userData = await retrieveParticipant(userId);
    const paymentData = await retrievePayment(userData.paymentId);
    this.setState(
      {
        ...this.state,
        userData,
        paymentData,
      },
      () => {
        this.handleClickOpen();
      },
    );
  };

  handleAttend = () => {
    attendParticipant(this.state.userId);
    this.handleClose();
  }

  handleError = (err) => {
    console.error(err);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const toUpperCase = (str) => {
      if (str) return str.toUpperCase();
    };

    const sabtuText = 'Sabtu, 24 February 2018 at Gelanggang Remaja Pasar Minggu';
    const mingguText = 'Minggu, 25 February 2018 at Gelanggang Remaja Pasar Minggu';

    const dayText = (day) => {
      if (day === 'sabtu') {
        return sabtuText;
      }

      if (day === 'minggu') {
        return mingguText;
      }
    };

    function pad(n, width, z) {
      z = z || '0';
      n += '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    const examNum = `00000${this.state.userData.examType === 'ipa' ? 0 : 1}${
      this.state.userData.daySelection === 'sabtu' ? 0 : 1
    }${pad(this.state.userData.userNumber, 4)}`;
    const tableDataStyle = { padding: '5px' };
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Check-in</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <table>
                <tr>
                  <td style={tableDataStyle}>First Name</td>
                  <td style={tableDataStyle}>{this.state.userData.firstName}</td>
                </tr>
                <tr>
                  <td style={tableDataStyle}>Last Name</td>
                  <td style={tableDataStyle}>{this.state.userData.lastName}</td>
                </tr>
                <tr>
                  <td style={tableDataStyle}>Email</td>
                  <td style={tableDataStyle}>{this.state.userData.email}</td>
                </tr>
                <tr>
                  <td style={tableDataStyle}>Exam Num.</td>
                  <td style={tableDataStyle}>{examNum}</td>
                </tr>
                <tr>
                  <td style={tableDataStyle}>Exam Type</td>
                  <td style={tableDataStyle}><strong>{toUpperCase(this.state.userData.examType)}</strong></td>
                </tr>
                <tr>
                  <td style={tableDataStyle}>Exam Date</td>
                  <td style={tableDataStyle}><strong>{dayText(this.state.userData.daySelection)}</strong></td>
                </tr>
                <tr>
                  <td style={tableDataStyle}>Payment</td>
                  <td style={tableDataStyle}>
                    <strong>{this.state.userData.paymentId !== '' ? 'Submitted' : 'Not Submitted'}</strong>
                  </td>
                </tr>
                <tr>
                  <td style={tableDataStyle}>Verification</td>
                  <td style={tableDataStyle}>
                    <strong>{this.state.paymentData.verificationTime > 0 ? 'Verified' : 'Not Verified'}</strong>
                  </td>
                </tr>
              </table>
              <code>UID: {this.state.userId}</code><br />
              <code>PID: {this.state.userData.paymentId}</code>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAttend} color="primary" autoFocus raised disabled={!(this.state.userData.paymentId !== '' && this.state.paymentData.verificationTime > 0)}>
              Accept Check-in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Scanner;
