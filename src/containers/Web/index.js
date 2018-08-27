import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import VacindoCard from '../../components/VacindoCard';
import {withStyles} from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

// Buat AppBar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import dummy from '../../utils/dummy.json';

// Algolia
var algoliasearch = require('algoliasearch');
var algoliasearch = require('algoliasearch/reactnative');
var algoliasearch = require('algoliasearch/lite');
var clientAlgolia = algoliasearch('NG4EKIHD89', 'f945cd0b9d03ef383d2ab2c8e4b7adc9');
var index = clientAlgolia.initIndex('index');

// Program
let { data } = dummy;
data = data.slice(0,6);



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
    height: '100vh',
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
  searchBarContainer: {
    padding: '0 20px'
  }
});



class Web extends Component {
  state = {
    data: data
  }

  handleSearch = (value) => {
    index.search(value, (err, content) => {
    const newData = content.hits;
    this.setState({ ...this.state, data: newData});

  })}

  render() {
    const {classes} = this.props;
    const {history} = this.props;

    let Cards = [];
    this.state.data.forEach(item => {
      Cards.push(
        <Grid item xs={12} sm={4}>
          <VacindoCard data={item} />
        </Grid>
      )
    });

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
            New way to vacate!
          </Typography>
        </div>
        <div className={this.props.classes.searchBarContainer}>
          <SearchBar
            onChange={() => console.log('onChange')}
            onRequestSearch={(value) => this.handleSearch(value)}
            style={{
              margin: '0 auto',
              maxWidth: 800
            }}
          />
        </div>
      </div>
    )

    return (
      <span>
        {jumbotron}
        {appbar}
        <div style={{ padding: '20px 50px', marginTop: '100vh' }}>
          <Typography variant="title">
            Experience travelers love
          </Typography>
          <Typography variant="subheading" gutterBottom style={{marginBottom: 20}}>
            Book vacation led by tour guides on your next trip
          </Typography>



        <div style={{ padding: 20 }}>
          <Grid container spacing={16}>
            {Cards}
          </Grid>
        </div>
        </div>
        <Footer/>
      </span>
    );
  }
}



export default withStyles(styles)(withRouter(Web));