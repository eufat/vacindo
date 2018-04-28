/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styleSheet = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  warningContainer: {
    backgroundColor: '#fff3e0',
    padding: '16px 16px',
  },
  infoContainer: {
    backgroundColor: '#e1f5fe',
    padding: '16px 16px',
  },
  warningParagraph: {
    color: '#dd2c00',
  },
  infoParagraph: {
    color: '#0288d1',
  },
});

function VacindoMessage(props) {
  return (
    <div className={props.classes.continaer}>
      <div className={props.warning ? props.classes.warningContainer : props.classes.infoContainer}>
        <Typography
          className={props.warning ? props.classes.warningParagraph : props.classes.infoParagraph}
        >
          <strong>{props.warning ? 'Warning' : 'Info'}: </strong> {props.children}
        </Typography>
      </div>
    </div>
  );
}

VacindoMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  warning: PropTypes.bool.isRequired,
};

export default withStyles(styleSheet)(VacindoMessage);
