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
});

class VacindoCardDetails extends Component {
  state = {
    open: false,
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
              <Typography gutterBottom>
                Let Google help apps determine location. This means sending anonymous location data
                to Google, even when no apps are running.
              </Typography>
            </DialogContentText>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.priceRange}
                </Typography>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue={currentFormattedDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
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
