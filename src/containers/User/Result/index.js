import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

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
      <div className={props.classes.container}>
        <center>Your Event Result will be Displayed Here.</center>
      </div>
      <OrionStepButtons beforeLink="/user/ticket" last />
    </div>
  );
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Result);
