import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Slide from 'material-ui/transitions/Slide';
import { DatePicker } from 'material-ui-pickers';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

const styleSheet = theme => ({
  image: {
    position: 'cover',
    width: '100%',
    height: '200px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class VacindoCardDetails extends Component {
  state = {
    open: false,
    person: '',
    selectedDate: new Date(),
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleChange = (event) => {
    this.setState({ ...this.state, person: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    const now = new Date();
    const currentFormattedDate = formatDate(now);

    return (
      <div>
        <Button onClick={this.handleClickOpen} fullWidth>
          View Destination
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          transition={Transition}
          keepMounted
        >
          <DialogContent>
            <img src={this.props.cardImage} className={classes.image} />
            <Typography gutterBottom variant="subheading">
              {this.props.miniHeadline}
            </Typography>
            <Typography gutterBottom variant="title">
              {this.props.mainHeadline}
            </Typography>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography gutterBottom>{this.props.description}</Typography>
            </DialogContentText>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={this.props.cardImage}
                title={this.props.cardTitle}
              />
              <CardContent>
                <Typography gutterBottom variant="title">
                  {this.props.priceRange}
                </Typography>
                <form
                  className={classes.container}
                  noValidate
                  className={classes.root}
                  autoComplete="off"
                >
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="date"
                      label="Date"
                      type="date"
                      defaultValue={currentFormattedDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="person-select">Person</InputLabel>
                    <Select
                      label="Person"
                      value={this.state.person}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'person',
                        id: 'person-select',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Book Destination
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(VacindoCardDetails);
