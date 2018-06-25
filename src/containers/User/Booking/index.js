import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import VacindoCard from '../../../components/VacindoCard';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import { IDR } from '../../../utils/numberHelper';
import VacindoStepButtons from '../components/VacindoStepButtons';

const styles = theme => ({
  emptyBooking: {
    textAlign: 'center',
    padding: '200px 0',
  },
  additionalInfo: {
    padding: '20px'
  }
});

function Booking(props) {
  let bookings = [...props.bookings];
  const { classes } = props;

  const DestinationCards = [];

  if (bookings.length > 0) {
    bookings.forEach((item) => {
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
            <CardActions>
              <Button color="primary" autoFocus>
                Pay Destination
              </Button>
            </CardActions>
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
      <VacindoStepButtons first nextLink="/user/payment"/>
    </div>
  );
}

function mapStateToProps({ user }) {
  return {
    bookings: user.bookings,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Booking));
