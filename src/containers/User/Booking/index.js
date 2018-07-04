import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';

import VacindoCard from '../../../components/VacindoCard';
import { IDR } from '../../../utils/numberHelper';
import VacindoStepButtons from '../components/VacindoStepButtons';

const styles = () => ({
  emptyBooking: {
    textAlign: 'center',
    padding: '200px 0',
  },
  additionalInfo: {
    padding: '20px',
  }
});

function Booking(props) {
  const { bookings, classes } = props;
  const bookingsData = [...bookings];
  const DestinationCards = [];

  if (bookingsData.length > 0) {
    bookingsData.forEach((item) => {
      const daySpent = dayjs(item.dateUntil).diff(dayjs(item.dateFrom), 'days');

      DestinationCards.push(
        <Grid item xs={12} sm={6}>
          <VacindoCard data={item}>
            <div className={classes.additionalInfo}>
              <Typography variant="subheading">{dayjs(item.dateFrom).format('dddd, D MMMM YYYY')} → {dayjs(item.dateUntil).format('dddd, D MMMM YYYY')}</Typography>
              <Typography variant="subheading">{daySpent} Days</Typography>
              <Typography variant="subheading">{item.person} person</Typography>
            </div>
            <div className={classes.additionalInfo}>
              <Typography gutterBottom variant="subheading">
                Estimated Total Price
              </Typography>
              <Typography gutterBottom variant="headline">
                {IDR(item.price * daySpent * item.person)}
              </Typography>
            </div>
          </VacindoCard>
        </Grid>);
    });
  }

  const bookingIsEmpty = DestinationCards.length === 0;

  return (
    <div>
      <Typography variant="title">Booking</Typography>
      <div style={{ padding: 20 }}>
        {bookingIsEmpty ? (
          <div className={classes.emptyBooking}>There are no bookings.</div>
        ) : (
          <Grid container spacing={16}>
            {DestinationCards}
          </Grid>
        )}
      </div>
      <VacindoStepButtons beforeLink="/user/explore" nextLink="/user/payment"/>
    </div>
  );
}

function mapStateToProps({ user }) {
  return {
    bookings: user.bookings,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Booking));
