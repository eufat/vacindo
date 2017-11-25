import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styleSheet = () => ({});

function Results(props) {
  return (
    <div>
      <center>This is Results</center>
    </div>
  );
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Results);
