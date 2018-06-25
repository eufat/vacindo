import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import dayjs from 'dayjs';

import { addBooking } from '../../../actions';
import { IDR } from '../../../../../utils/numberHelper';

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
  card: {
    margin: theme.spacing.unit
  }
});

class VacindoCardDetails extends Component {
  state = {
    open: false,
    person: '',
    dateFrom: '',
    dateUntil: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateChange = (event, key) => {
    const date = dayjs(event.target.value).toDate();
    this.setState({ ...this.state, [key]: date });
  };

  handleChange = (event) => {
    this.setState({ ...this.state, person: event.target.value });
  };

  handleBook = () => {
    const { data, dispatch, history } = this.props;
    const { person, dateFrom, dateUntil } = this.state;
    const dataToBook = { ...data, person, dateFrom, dateUntil };

    dispatch(addBooking(dataToBook));
    history.push('/user/booking');
  };

  render() {
    const { classes, data } = this.props;
    const { selectedDate } = this.state;

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    const todayFormattedDate = today.format('DD/MM/YYYY');
    const tomorrowFormattedDate = tomorrow.format('DD/MM/YYYY');

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
            <img src={data.imageURL} className={classes.image} />
            <Typography gutterBottom variant="subheading">
              {data.preTitle}
            </Typography>
            <Typography gutterBottom variant="title">
              {data.title}
            </Typography>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography gutterBottom>{data.description}</Typography>
            </DialogContentText>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={data.imageURL} title={data.title} />
              <CardContent>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="date"
                      label="From"
                      type="date"
                      onChange={event => this.handleDateChange(event, 'dateFrom')}
                      defaultValue={todayFormattedDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="date"
                      label="Until"
                      type="date"
                      onChange={event => this.handleDateChange(event, 'dateUntil')}
                      defaultValue={tomorrowFormattedDate}
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
                  <br />
                  <Typography gutterBottom variant="subheading">
                    Estimated price
                  </Typography>
                  <Typography gutterBottom variant="headline">
                    {IDR(data.price)}
                  </Typography>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleBook} color="primary" autoFocus>
              Book Destination
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

VacindoCardDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(connect()(withRouter(VacindoCardDetails)));
