import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';

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

import { setPaymentData, setPaymentImage, fetchVoucherData } from '../../../actions';
import { errorMessage } from '../../../../App/actions';
import {
  numberWithDelimiter,
  numberStripDelimiter,
  getDate,
} from '../../../../../utils/numberHelper';

import OrionMessage from '../../../../../components/OrionMessage';

const toUpperCase = string => string.toUpperCase();

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
    onSubmitProcess: false,
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

  handleOnSubmitPayment = async () => {
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
      const voucherIsValid = await this.voucherIsValid();
      if (voucherIsValid) {
        let voucherForm = this.state.form.voucher;
        voucherForm = { ...voucherForm, code: toUpperCase(voucherForm.code) };
        dispatch(setPaymentData(user.uid, 'voucher', voucherForm, noop => noop));
      }
      checkPayment();
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
    return new Promise(async (resolve, reject) => {
      const now = new Date();
      const { dispatch } = this.props;
      let voucherForm = this.state.form.voucher;
      voucherForm = { ...voucherForm, code: toUpperCase(voucherForm.code) };

      const voucherData = await fetchVoucherData(voucherForm.code);

      if (voucherForm === '') {
        dispatch(errorMessage('Voucher form cannot be empty'));
        resolve(false);
      } else if (isEmpty(voucherData) || voucherData === null) {
        dispatch(errorMessage('This voucher code is wrong'));
        resolve(false);
      } else if (voucherData.paymentId !== '') {
        dispatch(errorMessage('This voucher code was used'));
        resolve(false);
      } else if (now.getTime() > voucherData.vocExpire) {
        dispatch(errorMessage('This voucher was expired'));
        resolve(false);
      }

      resolve(true);
    })
  };

  render() {
    const { classes } = this.props;

    const transfer = () => (
      <div>
        <OrionMessage>
          No Rekening TOSSAKA 14th:
          BNI 0589616111 a.n. Rizqi Imam Gilang
        </OrionMessage>
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
        <div>
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
          color="primary"
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
