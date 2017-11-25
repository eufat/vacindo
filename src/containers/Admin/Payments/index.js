import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import OrionTable from './components/OrionTable';
import OrionVoucher from './components/OrionVoucher';

const styleSheet = () => ({
  panel: {
    marginBottom: 16,
  },
});

class Payments extends Component {
  render() {
    const { appData, classes } = this.props;
    return (
      <div>
        <div className={classes.panel}>
          <OrionVoucher {...this.props} />
        </div>
        <div className={classes.panel}>
          <OrionTable paymentsCount={(appData && appData.paymentsCount) || 0}  {...this.props} />
        </div>
      </div>
    );
  }
}

Payments.propTypes = {
  appData: PropTypes.object,
};

Payments.defaultProps = {
  appData: {},
};

function mapStateToProps({ admin }) {
  return {
    appData: admin.appData,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Payments));
