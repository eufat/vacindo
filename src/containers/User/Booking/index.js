import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import VacindoCard from '../../../components/VacindoCard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  emptyBooking: {
    textAlign: 'center',
    padding: '200px 0',
  },
});

function Booking(props) {
  const { classes } = props;
  let bookings = [];
  bookings = props.bookings;

  const Cards = [];

  if (bookings.length > 0) {
    bookings.forEach((item) => {
      console.log('item', item);

      Cards.push(
        <Grid item xs={12} sm={6}>
          <VacindoCard data={item}>
          </VacindoCard>
        </Grid>);
    });
  }

  const bookingIsEmpty = Cards.length === 0;

  return (
    <span>
      <div style={{ padding: 20 }}>
        {bookingIsEmpty ? (
          <div className={classes.emptyBooking}>There are no bookings.</div>
        ) : (
          <Grid container spacing={16}>
            {Cards}
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
