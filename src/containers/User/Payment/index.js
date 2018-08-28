/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { fetchPaymentData, fetchUserData, retrieveBookingsData } from '../actions';
import VacindoPaymentForms from './components/VacindoPaymentForms';
import VacindoPaymentComplete from './components/VacindoPaymentComplete';
import VacindoStepButtons from '../components/VacindoStepButtons';

import { IDR } from '../../../utils/numberHelper';

const styleSheet = () => ({
  paymentContainer: {
    padding: 20,
  },
});

class Payment extends Component {
  state = {
    verificationTime: null,
    paymentData: {},
    bookings: [],
    onProgress: false,
  };

  componentDidMount() {
    this.checkPayment();
    this.retrieveData();
  }

  retrieveData = () => {
    const { user, dispatch } = this.props;
    const userId = user.uid;

    this.setState({ ...this.state, onProgress: true }, () => {
      dispatch(retrieveBookingsData(userId, (bookings) => {
        this.setState({
          ...this.state,
          bookings: values(bookings),
          onProgress: false,
        });
      }));
    });
  };

  checkPayment = async () => {
    const { user } = this.props;
    const userData = await fetchUserData(user.uid);
    const paymentId = userData && userData.paymentId;

    if (paymentId) {
      const paymentData = await fetchPaymentData(paymentId);
      const { verificationTime } = paymentData;
      this.setState({ paymentData, verificationTime });
    }
  };

  render() {
    const { classes } = this.props;

    const isPaymentEmpty = this.state.verificationTime === null;
    const verification = this.state.verificationTime > 0 ? 'Verified' : 'Waiting Verification';

    const { bookings } = this.state;
    const bookingsData = [...bookings];

    let totalBookingsPrice = 0;

    bookingsData.forEach((item) => {
      const daySpent = dayjs(item.dateUntil).diff(dayjs(item.dateFrom), 'days');
      const bookingPrice = item.price * daySpent * item.person;

      totalBookingsPrice += bookingPrice;
    });

    const bookingIsEmpty = !(bookingsData.length > 0);

    const PaymentContent = () => (
      <div>
        <Typography gutterBottom variant="subheading">
          Payment Total
        </Typography>
        <Typography gutterBottom variant="headline">
          {IDR(totalBookingsPrice)}
        </Typography>
      </div>
    );

    return (
      <div className={classes.paymentContainer}>
        <div className={classes.paymentContent}>
          {bookingIsEmpty ? (
            <div className={classes.emptyPayment}>There are no bookings.</div>
          ) : (
            <Grid container spacing={16}>
              {PaymentContent()}
            </Grid>
          )}
        </div>
        {isPaymentEmpty ? (
          <VacindoPaymentForms checkPayment={this.checkPayment} />
        ) : (
          <VacindoPaymentComplete verification={verification} />
        )}
        <VacindoStepButtons beforeLink="/user/profile" last />
      </div>
    );
  }
}

Payment.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.currentUser,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Payment));
