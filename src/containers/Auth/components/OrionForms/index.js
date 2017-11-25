import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import locationsData from '../../../../utils/locations.json';

const locations = locationsData.map(location => location.name);
const referrals = [
  { val: 'roadshow', caption: 'Referred From Event Roadshow' },
  { val: 'friends', caption: 'Referred From Friends' },
  { val: 'line', caption: 'Referred From Line' },
  { val: 'instagram', caption: 'Referred From Instagram' },
  { val: 'askfm', caption: 'Referred From Ask.fm' },
  { val: 'twitter', caption: 'Referred From Twitter' },
  { val: 'website', caption: 'Referred From This Website' },
];

const styleSheet = () => ({
  nameContainer: {
    display: 'flex',
  },
  nameItem: {
    flexGrow: 1,
    '&:first-child': {
      marginRight: 10,
    },
  },
});

const OrionForms = props => (
  <div>
    <div className={props.classes.nameContainer}>
      <div className={props.classes.nameItem}>
        <TextField
          disabled={props.disabled}
          value={props.forms.firstName}
          fullWidth
          margin="dense"
          className={props.classes.input}
          type="text"
          label="First Name"
          onChange={(e) => {
            props.changeFormFields(e, 'firstName');
          }}
        />
      </div>
      <div className={props.classes.nameItem}>
        <TextField
          disabled={props.disabled}
          value={props.forms.lastName}
          fullWidth
          margin="dense"
          className={props.classes.input}
          type="text"
          label="Last Name"
          onChange={(e) => {
            props.changeFormFields(e, 'lastName');
          }}
        />
      </div>
    </div>
    <TextField
      disabled={props.disabled}
      value={props.forms.phoneNumber}
      fullWidth
      margin="dense"
      className={props.classes.input}
      type="text"
      label="Phone Number"
      onChange={(e) => {
        props.changeFormFields(e, 'phoneNumber');
      }}
    />
    <TextField
      disabled={props.disabled}
      value={props.forms.school}
      fullWidth
      margin="dense"
      className={props.classes.input}
      type="text"
      label="School"
      onChange={(e) => {
        props.changeFormFields(e, 'school');
      }}
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="forms-exam-type">Exam Type</InputLabel>
      <Select
        disabled={props.disabled}
        value={props.forms.examType}
        onChange={props.changeFormSelect('examType')}
        input={<Input id="forms-exam-type" />}
      >
        <MenuItem key={1} value="" />
        <MenuItem key={2} value={'ipa'}>
          IPA
        </MenuItem>
        <MenuItem key={3} value={'ips'}>
          IPS
        </MenuItem>
        <MenuItem key={4} value={'ipc'}>
          IPC
        </MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel htmlFor="forms-location">Location</InputLabel>
      <Select
        disabled={props.disabled}
        value={props.forms.location}
        onChange={props.changeFormSelect('location')}
        input={<Input id="forms-location" />}
      >
        <MenuItem value="" />
        {locations.map((location, index) => (
          <MenuItem key={index} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel htmlFor="forms-referral">Referral</InputLabel>
      <Select
        disabled={props.disabled}
        value={props.forms.referral}
        onChange={props.changeFormSelect('referral')}
        input={<Input id="forms-referral" />}
      >
        <MenuItem value="" />
        {referrals.map(referral => <MenuItem value={referral.val}>{referral.caption}</MenuItem>)}
      </Select>
    </FormControl>
  </div>
);

OrionForms.propTypes = {
  disabled: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  changeFormFields: PropTypes.func.isRequired,
  changeFormSelect: PropTypes.func.isRequired,
  forms: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    examType: PropTypes.string.isRequired,
    referral: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styleSheet)(OrionForms);
