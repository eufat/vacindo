import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import OrionTable from './components/OrionTable';
import Typography from 'material-ui/Typography';

const styleSheet = () => ({});

class Participants extends Component {
  render() {
    const { appData } = this.props;

    return (
      <div>
        <Typography type="title">Participants</Typography>
        <br />
        <OrionTable participantsCount={(appData && appData.usersCount) || 0} />
      </div>
    );
  }
}

Participants.propTypes = {
  appData: PropTypes.object,
};

Participants.defaultProps = {
  appData: {},
};

function mapStateToProps({ admin }) {
  return {
    appData: admin.appData,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Participants));
