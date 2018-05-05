import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import VacindoStepButtons from '../components/VacindoStepButtons';

const styleSheet = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: theme.spacing.unit * 3,
  }),
  icon: {
    height: 64,
    width: 64,
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    textDecoration: 'none',
  },
  input: {
    display: 'none',
  },
  anchor: {
    textDecoration: 'none',
  },
});

function Booking(props) {
  return (
    <div>
      <Typography type="title">Booking</Typography>
      <div className={props.classes.container}>
        <center>
          <p>This is Booking</p>
        </center>
      </div>
      <VacindoStepButtons beforeLink="/user/ticket" last />
    </div>
  );
}

Booking.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Booking);
