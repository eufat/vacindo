import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DoneIcon from 'material-ui-icons/Done';
import DoneAllIcon from 'material-ui-icons/DoneAll';

const styleSheet = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: theme.spacing.unit * 3,
  }),
  paymentStatus: {
    padding: 64,
    textAlign: 'center',
  },
  icon: {
    height: 64,
    width: 64,
    margin: theme.spacing.unit,
  },
});

function OrionPaymentComplete(props) {
  return (
    <div className={props.classes.paymentStatus}>
      <center>
        {props.verification === 'verified' ? (
          <DoneAllIcon className={props.classes.icon} />
        ) : (
          <DoneIcon className={props.classes.icon} />
        )}
        <p>
          Your payment successfully submitted and <strong>{props.verification}</strong> from host.
        </p>
      </center>
    </div>
  );
}

OrionPaymentComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  verification: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(OrionPaymentComplete);
