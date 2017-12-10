import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';

import eventConfig from '../../../../../event.config';
import { createVouchers } from '../../../actions';

const now = new Date();
const timestamp = now.getTime();

const styleSheet = () => ({
  paper: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});

class OrionVoucher extends Component {
  state = {
    onLoad: false,
    downloadPath: '',
    data: {
      filename: 'vouchers',
      type: 'vouchers',
      eventData: eventConfig.eventData,
      vouchersData: {
        vocTotalAmount: 100,
        vocPerPage: 5,
        vocLogo: '',
        vocValue: 40000,
        vocClass: 'IPA',
        vocExpire: timestamp + 60 * 60 * 24 * 7,
      },
    },
  };

  setDownloadPath = (downloadPath) => {
    this.setState({ ...this.state, downloadPath, onLoad: false });
  };

  download = () => {
    window.open(this.state.downloadPath, '_blank');
  };

  changeData = field => (e) => {
    const prevState = this.state;
    const data = prevState.data;
    const vouchersData = data.vouchersData;
    const newState = update(vouchersData, {
      $merge: { [field]: e.target.value },
    });
    this.setState({
      ...this.state,
      data: { ...data, vouchersData: newState },
    });
  };

  generateVouchers = () => {
    this.setState({ ...this.state, onLoad: true }, async () => {
      try {
        const { vouchersData } = this.state.data;
        const dataToCreate = this.state.data;
        dataToCreate.filename = `AMO-${vouchersData.vocTotalAmount}-TIM-${timestamp}-CLS-${vouchersData.vocClass.toUpperCase()}`;
        const downloadPath = await createVouchers(dataToCreate);
        this.setDownloadPath(downloadPath);
      } catch (err) {
        console.error(err);
        this.setState({ ...this.state, onLoad: false });
      }
    });
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Paper className={this.props.classes.paper}>
              <TextField
                value={this.state.data.vouchersData.vocTotalAmount}
                fullWidth
                margin="dense"
                type="text"
                label="Voucher Amount"
                onChange={this.changeData('vocTotalAmount')}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="forms-exam-type">Vouchers Type</InputLabel>
                <Select
                  value={this.state.data.vouchersData.vocClass}
                  onChange={this.changeData('vocClass')}
                  input={<Input id="forms-exam-type" />}
                >
                  <MenuItem key={1} value={'IPA'}>
                    IPA
                  </MenuItem>
                  <MenuItem key={2} value={'IPS'}>
                    IPS
                  </MenuItem>
                  <MenuItem key={3} value={'IPC'}>
                    IPC
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                raised
                disabled={this.state.onLoad}
                onClick={() => this.generateVouchers()}
                className={this.props.classes.button}
              >
                {this.state.onLoad ? 'Generating ...' : 'Generate Voucher'}
              </Button>
              <Button onClick={() => this.download()} disabled={this.state.downloadPath === ''}>
                Download Vouchers
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={this.props.classes.paper}>Find Vouchers</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

OrionVoucher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(OrionVoucher);
