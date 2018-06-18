import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styleSheet = () => ({});

function Results(props) {
  return (
    <div>
      <Typography type="title">Results</Typography>
    </div>
  );
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Results);
