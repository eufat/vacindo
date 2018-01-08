import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import OrionStepButtons from '../components/OrionStepButtons';

const styleSheet = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: theme.spacing.unit * 3,
  }),
});

function Result(props) {
  return (
    <div>
      <Typography type="title">Result</Typography>
      <div className={props.classes.container}>
        <center>Your tryout result not found or not yet generated.</center>
      </div>
      <OrionStepButtons beforeLink="/user/ticket" last />
    </div>
  );
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Result);
