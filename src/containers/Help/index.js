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



class Help extends Component {
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
            Help
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
            Why tourguiding with Vacindo?
          </Typography>
          <Typography variant="subheading" gutterBottom style={{marginBottom: 20}}>
            No matter what kind of vacation you want to share, Vacindo makes it simple and secure to earn money and reach hundreds of Vacationer looking for unique vacation to spend the day, just like yours.
          </Typography>

          <Typography variant="title">
            You’re in control
          </Typography>
          <Typography variant="subheading" gutterBottom style={{marginBottom: 20}}>
            With Vacindo, you’re in full control of your availability, prices and how you interact with vacationer. You can set check-in times and handle the process however you like.
          </Typography>



        <div style={{ padding: 20 }}>
        </div>
        </div>
        <Footer/>
      </span>
    );
  }
}



export default withStyles(styles)(withRouter(Help));