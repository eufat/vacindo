import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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

const styles = theme => ({
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
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <div>
              <div className={classes.formContainer}>
                <Typography type="title">New Vacation</Typography>
                <TextField fullWidth label="Vacation Name" />
                <TextField fullWidth label="Vacation Type" />
                <TextField fullWidth rows="4" multiline label="Vacation Description" />
                <FormControl fullWidth>
                  <InputLabel htmlFor="forms-location">Vacation Location</InputLabel>
                  <Select input={<Input id="forms-location" />}>
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
                    />
                  </div>
                </div>
                <TextField fullWidth label="Vacation Price" />
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
