import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styleSheet = () => ({});

function Settings(props) {
  return (
    <div>
      <center>This is Settings</center>
    </div>
  );
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Settings);
