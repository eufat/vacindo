import some from 'lodash/some';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import classnames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';

import { setPaymentData, setPaymentImage } from '../../../actions';
import { errorMessage } from '../../../../App/actions';
import {
  numberWithDelimiter,
  numberStripDelimiter,
  getDate,
} from '../../../../../utils/numberHelper';

const styleSheet = theme => ({
  hidden: {
    display: 'none',
  },
  methodInput: {
    marginBottom: 16,
  },
  fileInput: {
    display: 'none',
    marginTop: 0,
  },
  fileName: {
    marginBottom: 0,
  },
  button: {
    marginTop: theme.spacing.unit * 4,
  },
  container: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  nopayment: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10,
    textAlign: 'center',
  },
});

const noFileName = 'No file selected.';

class OriontransferForms extends Component {
  state = {
    verified: false,
    method: '',
    imageName: noFileName,
    imageFile: '',
    form: {
      voucher: {
        code: '',
      },
      transfer: {
        bankName: '',
        bankAccount: '',
        transferors: '',
        transferDate: getDate(),
        transferAmount: '',
      },
    },
  };

  changeFormField = (type, field, value) => {
    const prevState = this.state.form;
    const newState = {
      ...this.state,
      form: {
        ...prevState,
        [type]: update(prevState[type], {
          $merge: { [field]: value },
        }),
      },
    };

    this.setState(newState);
  };

  changePaymentMethod = () => (e) => {
    this.setState({ ...this.state, method: e.target.value });
  };

  changeFile = () => {
    const inputFile = document.getElementById('file').files[0];
    const imageName = inputFile.name ? inputFile.name : noFileName;
    const imageFile = inputFile;
    this.setState({ ...this.state, imageFile, imageName });
  };

  handleOnSubmitPayment = () => {
    const method = this.state.method;
    const { dispatch, user, checkPayment } = this.props;

    if (method === 'transfer') {
      const selectedFile = this.state.imageFile;
      if (this.transferIsValid()) {
        dispatch(setPaymentData(user.uid, 'transfer', this.state.form.transfer, () => {
          dispatch(setPaymentImage(user.uid, selectedFile));
        }));
      }
      checkPayment();
    } else if (method === 'voucher') {
      if (this.voucherIsValid()) {
        dispatch(setPaymentData(user.uid, 'voucher', this.state.form.voucher));
      }
    }
  };


  transferIsValid = () => {
    const { dispatch } = this.props;
    const transferForm = this.state.form.transfer;
    const { imageFile } = this.state;    

    if (some(transferForm, field => field === '')) {
      dispatch(errorMessage('Transfer form must be completed'));
      return false;
    }

    if (imageFile === '') {
      dispatch(errorMessage('Please select transfer image file'));
      return false;
    }

    return true;
  };

  voucherIsValid = () => {
    const { dispatch } = this.props;
    const voucherForm = this.state.form.voucher;

    if (some(voucherForm, field => field === '')) {
      dispatch(errorMessage('Voucher form must be completed'));
      return false;
    }

    return true;
  };

  render() {
    const { classes } = this.props;

    const transfer = () => (
      <div>
        <TextField
          value={this.state.form.transfer.bankName}
          fullWidth
          margin="dense"
          type="text"
          label="Fill Bank Name"
          onChange={(e) => {
            this.changeFormField('transfer', 'bankName', e.target.value);
          }}
        />
        <TextField
          value={this.state.form.transfer.bankAccount}
          fullWidth
          margin="dense"
          type="number"
          label="Fill Bank Account"
          onChange={(e) => {
            this.changeFormField('transfer', 'bankAccount', e.target.value);
          }}
        />
        <TextField
          value={this.state.form.transfer.transferors}
          fullWidth
          margin="dense"
          type="text"
          label="Fill Transferors"
          onChange={(e) => {
            this.changeFormField('transfer', 'transferors', e.target.value);
          }}
        />
        <TextField
          value={this.state.form.transfer.transferDate}
          fullWidth
          margin="dense"
          type="date"
          label="Fill Transfer Date"
          onChange={(e) => {
            this.changeFormField('transfer', 'transferDate', e.target.value);
          }}
        />
        <TextField
          value={numberWithDelimiter(this.state.form.transfer.transferAmount, '.')}
          fullWidth
          margin="dense"
          type="text"
          label="Fill Transfer Amount"
          onChange={(e) => {
            this.changeFormField(
              'transfer',
              'transferAmount',
              numberStripDelimiter(e.target.value, '.'),
            );
          }}
        />
        <p className={this.props.classes.fileName}>{this.state.imageName}</p>
        <input
          onChange={this.changeFile}
          accept="jpg,jpeg,JPG,JPEG"
          className={this.props.classes.fileInput}
          id="file"
          multiple
          type="file"
        />
        <label htmlFor="file">
          <Button raised component="span" className={this.props.classes.button}>
            Select Transfer Image
          </Button>
        </label>
      </div>
    );

    const voucher = () => (
      <div>
        <TextField
          value={this.state.form.voucher.code}
          fullWidth
          margin="dense"
          type="text"
          label="Fill Voucher Code"
          onChange={(e) => {
            this.changeFormField('voucher', 'code', e.target.value);
          }}
        />
      </div>
    );
    const nopayment = () => (
      <div className={classes.nopayment}>
        <p>Choose Payment Method Above.</p>
      </div>
    );

    const method = () => {
      switch (this.state.method) {
        case 'transfer':
          return transfer();
        case 'voucher':
          return voucher();
        default:
          return nopayment();
      }
    };

    return (
      <div>
        <FormControl fullWidth className={classes.methodInput}>
          <InputLabel htmlFor="payment-method">Payment Method</InputLabel>
          <Select
            value={this.state.method}
            onChange={this.changePaymentMethod()}
            input={<Input id="payment-method" />}
          >
            <MenuItem value="" />
            <MenuItem value={'transfer'}>Bank Transfer</MenuItem>
            <MenuItem value={'voucher'}>Voucher Code</MenuItem>
          </Select>
        </FormControl>
        {method()}
        <Button
          raised
          className={classnames(classes.button, !this.state.method && classes.hidden)}
          onClick={() => this.handleOnSubmitPayment()}
        >
          Submit {this.state.method}
        </Button>
      </div>
    );
  }
}

OriontransferForms.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  checkPayment: PropTypes.func.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.currentUser,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(OriontransferForms));
