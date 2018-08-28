import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import dayjs from 'dayjs';
import values from 'lodash/values';

import VacindoCard from '../../../components/VacindoCard';
import { IDR } from '../../../utils/numberHelper';
import VacindoStepButtons from '../components/VacindoStepButtons';
import { retrieveBookingsData } from '../actions';

const styles = () => ({
  emptyBooking: {
    textAlign: 'center',
    padding: '200px 0',
  },
  additionalInfo: {
    padding: '20px',
  },
  bookingContainer: {
    padding: '20px',
  },
});

class Booking extends Component {
  state = {
    bookings: [],
    onProgress: false,
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = () => {
    const { currentUser, dispatch } = this.props;
    const userId = currentUser.uid;

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

  render() {
    const { bookings, onProgress } = this.state;
    const { classes } = this.props;
    const bookingsData = [...bookings];
    const DestinationCards = [];

    if (bookingsData.length > 0) {
      bookingsData.forEach((item) => {
        const daySpent = dayjs(item.dateUntil).diff(dayjs(item.dateFrom), 'days');

        const DestinationCardComponent = () => (
          <Grid item xs={12} sm={4}>
            <VacindoCard data={item}>
              <div className={classes.additionalInfo}>
                <Typography variant="subheading">
                  {dayjs(item.dateFrom).format('dddd, D MMMM YYYY')} →{' '}
                  {dayjs(item.dateUntil).format('dddd, D MMMM YYYY')}
                </Typography>
                <Typography variant="subheading">{daySpent} Days</Typography>
                <Typography variant="subheading">{item.person} person</Typography>
              </div>
              <div className={classes.additionalInfo}>
                <Typography gutterBottom variant="subheading">
                  Cost
                </Typography>
                <Typography gutterBottom variant="headline">
                  {IDR(item.price * daySpent * item.person)}
                </Typography>
              </div>
            </VacindoCard>
          </Grid>
        );

        DestinationCards.push(DestinationCardComponent());
      });
    }

    const bookingIsEmpty = DestinationCards.length === 0;

    return (
      <div className={classes.bookingContainer}>
        <Typography variant="title">Booking</Typography>

        {onProgress ? (
          <center>
            <CircularProgress className={classes.progress} />
          </center>
        ) : (
          <div>
            {bookingIsEmpty ? (
              <div className={classes.emptyBooking}>There are no bookings.</div>
            ) : (
              <Grid container spacing={16}>
                {DestinationCards}
              </Grid>
            )}
          </div>
        )}
        <VacindoStepButtons beforeLink="/user/explore" nextLink="/user/payment" />
      </div>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return {
    currentUser: auth.currentUser,
    bookings: user.bookings,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Booking));
