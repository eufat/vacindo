import React, { Component } from 'react';
import update from 'immutability-helper';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import locationsData from '../../../../../utils/locations.json';

const locations = locationsData.map(location => location.name);

// import { IDR } from '../../.../../../../utils/numberHelper';

const styles = () => ({
  card: {
    padding: 0,
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  formContainer: {
    padding: 10,
  },
  dateContainer: {
    display: 'flex',
  },
  dateItem: {
    flexGrow: 1,
    '&:first-child': {
      marginRight: 10,
    },
  },
});

class VacindoAddVacation extends Component {
  state = {
    form: {
      title: '',
      preTitle: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      price: '',
    },
  };

  changeField = (e, field) => {
    const prevState = this.state.form;
    const newState = {
      ...prevState,
      [field]: e.target.value,
    };
    this.setState({
      ...this.state,
      form: newState,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <div>
              <div className={classes.formContainer}>
                <Typography type="title">New Vacation</Typography>
                <TextField
                  fullWidth
                  label="Vacation Name"
                  value={this.state.form.title}
                  onChange={(e) => {
                    this.changeField(e, 'title');
                  }}
                />
                <TextField
                  fullWidth
                  label="Vacation Type"
                  value={this.state.form.preTitle}
                  onChange={(e) => {
                    this.changeField(e, 'preTitle');
                  }}
                />
                <TextField
                  fullWidth
                  rows="4"
                  multiline
                  label="Vacation Description"
                  value={this.state.form.description}
                  onChange={(e) => {
                    this.changeField(e, 'description');
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="forms-location">Vacation Location</InputLabel>
                  <Select
                    input={<Input id="forms-location" />}
                    value={this.state.form.location}
                    onChange={(e) => {
                      this.changeField(e, 'location');
                    }}
                  >
                    <MenuItem value="" />
                    {locations.map((location, index) => (
                      <MenuItem key={index} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={classes.formContainer}>
                <Typography type="title">Date and Price</Typography>
                <div className={classes.dateContainer}>
                  <div className={classes.dateItem}>
                    <TextField
                      fullWidth
                      fullWidthlabel="Label"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Placeholder"
                      type="date"
                      value={this.state.form.startDate}
                      onChange={(e) => {
                        this.changeField(e, 'startDate');
                      }}
                    />
                  </div>
                  <div className={classes.nameItem}>
                    <TextField
                      fullWidth
                      fullWidthlabel="Label"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Placeholder"
                      type="date"
                      value={this.state.form.endDate}
                      onChange={(e) => {
                        this.changeField(e, 'endDate');
                      }}
                    />
                  </div>
                </div>
                <TextField
                  fullWidth
                  label="Vacation Price"
                  value={this.state.form.price}
                  onChange={(e) => {
                    this.changeField(e, 'price');
                  }}
                />
              </div>
              <div className={classes.formContainer}>
                <Button variant="contained" color="primary" className={classes.button}>
                  Create Vacation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(VacindoAddVacation);
