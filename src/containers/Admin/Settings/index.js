import React from 'react';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

class Settings extends React.Component {
  state = {
    openSignIn: true,
    openSignUp: true,
    adminData: {},
  };

  toggleSignIn = (checked) => {
    this.setState({ ...this.state, openSignIn: checked });
  }


  toggleSignUp = (checked) => {
    this.setState({ ...this.state, openSignUp: checked });
  }

  render() {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.openSignIn}
              onChange={(event, checked) => this.toggleSignIn(checked)}
            />
          }
          label="Sign In Form"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.openSignUp}
              onChange={(event, checked) => this.toggleSignUp(checked)}
            />
          }
          label="Sign Up Form"
        />
      </FormGroup>
    );
  }
}

export default Settings;