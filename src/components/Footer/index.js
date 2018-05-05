import React from 'react';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  footerContainer: {
    padding: '50px 20vw'
  }
};

function Footer(props) {
  const {classes} = props;
  return (
    <Grid container className={classes.footerContainer}>
      <Grid item xs={4}>
        <Typography variant="button" align="left" gutterBottom>Vacindo</Typography>
        <Typography variant="caption" align="left" gutterBottom><a href="">Policies</a></Typography>
        <Typography variant="caption" align="left" gutterBottom><a href="">Help</a></Typography>
        <Typography variant="caption" align="left" gutterBottom><a href="">About</a></Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="button" align="center" gutterBottom>Tour Guide</Typography>
        <Typography variant="caption" align="center" gutterBottom><a href="">Why become a tour guide</a></Typography>
        <Typography variant="caption" align="center" gutterBottom><a href="">Responsibility</a></Typography>
        <Typography variant="caption" align="center" gutterBottom><a href="">Community</a></Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="button" align="right" gutterBottom>Contact</Typography>
        <Typography variant="caption" align="right" gutterBottom>hello@vacindo.com</Typography>
        <Typography variant="caption" align="right" gutterBottom>0878 8013 4965</Typography>
        <Typography variant="caption" align="right" gutterBottom>Universitas Indonesia</Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Footer);
