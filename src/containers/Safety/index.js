import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import VacindoPromoCard from '../../components/VacindoPromoCard';
import {withStyles} from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';

// Buat AppBar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  flex: {
    flex: 1,
    marginLeft: 10
  },
  jumbotron: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundImage: 'url("/static/images/head.jpg")',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '50vh',
    margin: 0,
    paddingTop: '40vh'
  },
  titleJumbotronContainer: {
    textAlign: 'center'
  },
  titleJumbotron: {
    color: 'white',
    fontSize: '40px',
    fontFamily: "'Enriqueta', arial, serif",
    marginBottom: '1em',
  },
  buttonCard: {
    color: '#2980b9'
  }
});



class Safety extends Component {
  render() {
    const {classes} = this.props;
    const {history} = this.props;

    const appbar = (
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <a href="">
            <img src="/static/images/logo-small.png" width="30"></img>
          </a>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Vacindo
          </Typography>
          <Button color="inherit">Become a Tour Guide</Button>
          <Button color="inherit" onClick={() => history.push('/auth')}>Sign Up</Button>
          <Button color="inherit" onClick={() => history.push('/auth')}>Login</Button>
        </Toolbar>
      </AppBar>
    )

    const jumbotron = (
      <div className={this.props.classes.jumbotron}>
        <div className={this.props.classes.titleJumbotronContainer}>
          <Typography className={this.props.classes.titleJumbotron} variant="display3" gutterBottom>
            Safety Precautions
          </Typography>
        </div>
      </div>
    )

    return (
      <span>
        {jumbotron}
        {appbar}
        <div style={{ padding: '20px 50px', marginTop: '50vh' }}>
          <Typography variant="title">
            Emergency Procedures
          </Typography>
          <Typography variant="subheading" gutterBottom style={{marginBottom: 20}}>
              Contact Info:
              Call 112 for assistance and go to nearest hospital. Provide a clear emergency contact number for the hospital, for easy guest reference. Also make clear how you should be contacted.
              Supplies:
              Make a first aid kit (P3K) as easily available.
              Exits:
              Ensure you have a clearly marked exits, and post a map of your home.
          </Typography>

          <Typography variant="title">
            Minimize Hazards
          </Typography>
          <Typography variant="subheading" gutterBottom style={{marginBottom: 20}}>
            Privacy:
            Always be mindful of your guests' privacy. Make sure you are aware of privacy barrier and social interaction limits.
            Child-Proofing:
            Ensure your tour place is safe for children, or else notify guests of potential hazards.
            Climate:
            Ensure your activity is properly covered in all climate and that guests is secured within the climate. Ensure guests are comforted with you’r hospitality.

          </Typography>



        <div style={{ padding: 20 }}>
        </div>
        </div>
        <Footer/>
      </span>
    );
  }
}



export default withStyles(styles)(withRouter(Safety));