import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

function Account(props) {
  return (
    <div>
      <Typography variant="title">Account</Typography>
      <div className={props.classes.container}>
        <center>
          <p>This is Account</p>
        </center>
      </div>
      <VacindoStepButtons beforeLink="/user/ticket" last />
    </div>
  );
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Account);
