import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import VacindoCard from '../../../components/VacindoCard';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({});

function Booking(props) {
  let bookings = [];
  bookings = props.bookings;

  const Cards = [];

  if (bookings.length > 0) {
    bookings.forEach((item) => {
      Cards.push(<Grid item xs={12} sm={4}>
        <VacindoCard data={item} />
                 </Grid>);
    });
  }

  return (
    <span>
      <div style={{ padding: 20 }}>
        <Grid container spacing={16}>
          {Cards}
        </Grid>
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
