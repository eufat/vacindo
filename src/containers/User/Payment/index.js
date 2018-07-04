import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';

import VacindoStepButtons from '../components/VacindoStepButtons';
import { IDR } from '../../../utils/numberHelper';

const styleSheet = () => ({
  emptyPayment: {
    textAlign: 'center',
    padding: '200px 0',
  },
});

function Payment(props) {
  const { bookings, classes } = props;
  const bookingsData = [...bookings];

  let totalBookingsPrice = 0;

  bookingsData.forEach((item) => {
    const daySpent = dayjs(item.dateUntil).diff(dayjs(item.dateFrom), 'days');
    const bookingPrice = item.price * daySpent * item.person;

    totalBookingsPrice += bookingPrice;
  });

  const bookingIsEmpty = !(bookingsData.length > 0);

  console.log('tbc', totalBookingsPrice);

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
    <div>
      <Typography variant="title">Payment</Typography>
      <div style={{ padding: 20 }}>
        {bookingIsEmpty ? (
          <div className={classes.emptyPayment}>There are no bookings.</div>
        ) : (
          <Grid container spacing={16}>
            {PaymentContent()}
          </Grid>
        )}
      </div>
      <VacindoStepButtons last beforeLink="/user/explore" />
    </div>
  );
}

function mapStateToProps({ user }) {
  return {
    bookings: user.bookings,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Payment));
