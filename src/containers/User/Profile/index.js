import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import OrionForms from '../../Auth/components/OrionForms';
import OrionStepButtons from '../components/OrionStepButtons';


import { fetchUserData } from '../actions';

const styleSheet = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class Profile extends Component {
  state = {
    form: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      school: '',
      location: '',
      examType: '',
      referral: '',
    },
  };

  componentDidMount() {
    this.setUserDataToState();
  }

  setUserDataToState = async () => {
    const userId = this.props.user.uid;
    const userData = await fetchUserData(userId);
    this.setState({
      form: { ...this.state.form, ...userData },
    });
  };

  changeFormFields = (e, field) => {
    const prevState = this.state.form;
    const newState = update(prevState, {
      $merge: { [field]: e.target.value },
    });
    this.setState({
      ...this.state,
      form: { ...prevState, newState },
    });
  };

  changeFormSelect = name => (e) => {
    const prevState = this.state.form;
    const newState = update(prevState, {
      $merge: { [name]: e.target.value },
    });
    this.setState({
      ...this.state,
      form: { ...prevState, newState },
    });
  };

  render() {
    return (
      <div>
        <Typography type="title">Profile</Typography>
        <OrionForms
          changeFormFields={this.changeFormFields}
          changeFormSelect={this.changeFormSelect}
          forms={this.state.form}
          disabled
        />
        <OrionStepButtons nextLink="/user/payment" first />
      </div>
    );
  }
}

Profile.propTypes = {
  userData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.currentUser,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Profile));
