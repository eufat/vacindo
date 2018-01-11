/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { fetchPaymentData, fetchUserData } from '../actions';
import OrionPaymentForms from './components/OrionPaymentForms';
import OrionPaymentComplete from './components/OrionPaymentComplete';
import OrionStepButtons from '../components/OrionStepButtons';

class Payment extends Component {
  state = {
    verificationTime: null,
    paymentData: {},
  };

  componentDidMount() {
    this.checkPayment();
  }

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
    const isPaymentEmpty = this.state.verificationTime === null;
    const verification = this.state.verificationTime > 0 ? 'Verified' : 'Waiting Verification';

    return (
      <div>
        <Typography type="title">Payment</Typography>
        {isPaymentEmpty ? (
          <OrionPaymentForms checkPayment={this.checkPayment} />
        ) : (
          <OrionPaymentComplete verification={verification} />
        )}
        <OrionStepButtons beforeLink="/user/profile" nextLink="/user/ticket" />
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

export default connect(mapStateToProps)(Payment);
