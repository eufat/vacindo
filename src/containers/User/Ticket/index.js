import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ErrorOutline from 'material-ui-icons/ErrorOutline';

import OrionStepButtons from '../components/OrionStepButtons';

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
});

function Ticket(props) {
  return (
    <div>
      <Typography type="title">Ticket</Typography>
      <div className={props.classes.container}>
        <center><ErrorOutline className={props.classes.icon} /></center>
        <center>Tryout Ticket Not Found or Not yet Generated.</center>
      </div>
      <OrionStepButtons nextLink="/user/result" beforeLink="/user/payment" />
    </div>
  );
}

Ticket.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Ticket);
