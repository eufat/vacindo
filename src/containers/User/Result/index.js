import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';
import ErrorOutline from 'material-ui-icons/ErrorOutline';
import Button from 'material-ui/Button';

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

function Result(props) {
  return (
    <div>
      <Typography type="title">Result</Typography>
      <div className={props.classes.container}>
        <center>
          <InsertDriveFile className={props.classes.icon} />
          <br />
          <a
            href="http://bit.ly/PEMBAHASAN_TOSSAKA"
            target="_blank"
            rel="noopener noreferrer"
            className={props.classes.anchor}
          >
            <Button raised component="span" color="secondary" className={props.classes.button}>
              Download Pembahasan TOSSAKA
            </Button>
          </a>
          <a
            href="http://bit.ly/SOAL_TOSSAKA"
            target="_blank"
            rel="noopener noreferrer"
            className={props.classes.anchor}
          >
            <Button raised component="span" color="secondary" className={props.classes.button}>
              Download Soal TOSSAKA
            </Button>
          </a>
        </center>
      </div>
      <OrionStepButtons beforeLink="/user/ticket" last />
    </div>
  );
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Result);
