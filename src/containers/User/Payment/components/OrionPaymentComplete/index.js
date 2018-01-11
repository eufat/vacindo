import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import PlaylistAddCheck from 'material-ui-icons/PlaylistAddCheck';
import VerifiedUser from 'material-ui-icons/VerifiedUser';
import HourglassEmpty from 'material-ui-icons/HourglassEmpty';
import TrendingFlat from 'material-ui-icons/TrendingFlat';
import Typography from 'material-ui/Typography';

const styleSheet = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: theme.spacing.unit * 3,
  }),
  paymentStatus: {
    paddingTop: 64,
    paddingBottom: 64,
    textAlign: 'center',
  },
  icon: {
    height: 64,
    width: 64,
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
});

function OrionPaymentComplete(props) {
  return (
    <div className={props.classes.paymentStatus}>
      <Grid container className={props.classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={12}>
            <Grid key={0} item>
              <PlaylistAddCheck className={props.classes.icon} />
              <Typography type="body1" gutterBottom align="center">
                Payment Submitted
              </Typography>
            </Grid>
            <Grid key={1} item>
              <TrendingFlat color="disabled" className={props.classes.icon} />
            </Grid>
            <Grid key={2} item>
              {props.verification === 'Verified' ? (
                <VerifiedUser className={props.classes.icon} />
              ) : (
                <HourglassEmpty className={props.classes.icon} />
              )}
              <Typography type="body1" gutterBottom align="center">
                {props.verification}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

OrionPaymentComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  verification: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(OrionPaymentComplete);
