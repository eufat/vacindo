import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import VacindoCard from '../../../components/VacindoCard';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';

const styles = theme => ({
  emptyBooking: {
    textAlign: 'center',
    padding: '200px 0',
  },
});

function Booking(props) {
  let bookings = [...props.bookings];
  const { classes } = props;

  const DestinationCards = [];

  if (bookings.length > 0) {
    bookings.forEach((item) => {
      DestinationCards.push(
        <Grid item xs={12} sm={6}>
          <VacindoCard data={item}>
            <Typography variant="subheading">From {dayjs(item.dateFrom).format('dddd, D MMMM YYYY')}</Typography>
            <br />
            <Typography variant="subheading">Until {dayjs(item.dateUntil).format('dddd, D MMMM YYYY')}</Typography>
            <br />
            <Typography variant="subheading">For {item.person} person</Typography>
          </VacindoCard>
        </Grid>);
    });
  }

  const bookingIsEmpty = DestinationCards.length === 0;

  return (
    <span>
      <div style={{ padding: 20 }}>
        {bookingIsEmpty ? (
          <div className={classes.emptyBooking}>There are no bookings.</div>
        ) : (
          <Grid container spacing={16}>
            {DestinationCards}
          </Grid>
        )}
      </div>
    </span>
  );
}

function mapStateToProps({ user }) {
  return {
    bookings: user.bookings,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Booking));
