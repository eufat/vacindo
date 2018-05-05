import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

class VacindoDetailsDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Explore</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={this.props.cardImage}
                title={this.props.cardTitle}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h3">
                  {this.props.miniHeadline}
                </Typography>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.mainHeadline}
                </Typography>
                <Typography component="p">{this.props.priceRange}</Typography>
              </CardContent>
              <CardActions>{this.props.children}</CardActions>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default VacindoDetailsDialog;
