import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import NavigateNext from 'material-ui-icons/NavigateNext';
import NavigateBefore from 'material-ui-icons/NavigateBefore';

const styleSheet = theme => ({
  stepper: {
    display: 'block',
    height: 64,
    marginTop: 64,
  },
  buttonBefore: {
    margin: theme.spacing.unit,
    display: 'inline-block',
    float: 'left',
  },
  buttonNext: {
    margin: theme.spacing.unit,
    display: 'inline-block',
    float: 'right',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

function OrionStepButtons(props) {
  return (
    <div className={props.classes.stepper}>
      <div>
        <Button
          className={props.classes.buttonBefore}
          disabled={props.first}
          onClick={() => props.history.push(props.beforeLink)}
        >
          <NavigateBefore className={props.classes.leftIcon} />
          Before
        </Button>
        <Button
          className={props.classes.buttonNext}
          disabled={props.last}
          onClick={() => props.history.push(props.nextLink)}
        >
          Next
          <NavigateNext className={props.classes.rightIcon} />
        </Button>
      </div>
    </div>
  );
}

OrionStepButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  beforeLink: PropTypes.string,
  nextLink: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

OrionStepButtons.defaultProps = {
  first: false,
  last: false,
  beforeLink: './',
  nextLink: './',
};

export default withRouter(withStyles(styleSheet)(OrionStepButtons));
