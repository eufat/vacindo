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

// Algolia
var algoliasearch = require('algoliasearch');
var algoliasearch = require('algoliasearch/reactnative');
var algoliasearch = require('algoliasearch/lite');

var clientAlgolia = algoliasearch('VR7FD3DTUW', 'b4e4ff31927c35e087ef52d93784f081');
var index = clientAlgolia.initIndex('index');

index.search('puppet', function(err, content) {
  console.log(content.hits);
});

// Program
const data = [
  {
    "imageURL":
      "http://static.asiawebdirect.com/m/bangkok/portals/indonesia-holidays-com/homepage/samosir-island/allParagraphs/BucketComponent/ListingContainer/01/image/samo600b.jpg",
    "url": "http://www.indonesia.travel/en/destination/point-of-interest/samosir-island",
    "color": null,
    "preTitle": "Lakes",
    "title": "Samosir Island",
    "buildings": null,
    "stars": null,
    "subtitle": null,
    "description":
      "The island of Samosir, situated in the huge crater lake of Toba. The island, together with its surrounding areas is the heart of the Toba Batak culture. A visit to Lake Toba is not complete without a stay on Samosir with its many traditional villages along its shoreline.",
    "places": null,
    "pois": null,
    "longitude": "98.792772",
    "latitude": "2.640869",
    "price": "1500000"
  },
  {
    "imageURL": "http://farm6.staticflickr.com/5499/11509522905_f4c10137e1_b.jpg",
    "url": "http://www.indonesia.travel/en/destination/point-of-interest/sigale-gale-puppet-show",
    "color": null,
    "preTitle": "Arts & Cultures",
    "title": "Sigale-gale Puppet Show",
    "buildings": null,
    "stars": null,
    "subtitle": null,
    "description":
      " Sigale-gale is a Batak life-sized puppet show, which is traditionally performed at funerals but may now also be performed for visitors.",
    "places": null,
    "pois": null,
    "longitude": "98.863841",
    "latitude": "2.612432",
    "price": "1500000"
  },
  {
    "imageURL": "https://images2.tempo.co/data/2014/06/28/id_302262/302262_620.jpg",
    "url": "http://www.indonesia.travel/en/destination/point-of-interest/oukup",
    "color": null,
    "preTitle": "Spas",
    "title": "Oukup",
    "buildings": null,
    "stars": null,
    "subtitle": null,
    "description":
      "The Batak ethnic groups living in North Sumatera have long realized that nature is not only man\u2019s  main source of life but it also provides precious medicinal cures. Traditional natural treatments have long been part of daily life in North Sumatera.",
    "places": null,
    "pois": null,
    "longitude": "98.620011",
    "latitude": "95.336521",
    "price": "1500000"
  },
  {
    "imageURL": "http://kemanaaja.com/wp-content/uploads/2015/11/IMG_4501-825x510.jpg",
    "url": "http://www.indonesia.travel/en/destination/point-of-interest/bukit-lawang",
    "color": null,
    "preTitle": "Forests & Wildlife",
    "title": "Bukit Lawang",
    "buildings": null,
    "stars": null,
    "subtitle": null,
    "description":
      "Bukit Lawang is a small village situated at the south of the Mount Leuseur National Park and the gateway to the legendary Sumatran jungle.",
    "places": null,
    "pois": null,
    "longitude": "98.144269",
    "latitude": "3.555769",
    "price": "1500000"
  },
  {
    "imageURL":
      "https://i2.wp.com/pamitrantours.com/wp-content/uploads/2016/04/Pulau-Tidung-3.jpg?fit=885%2C584",
    "url": "http://www.indonesia.travel/en/destination/point-of-interest/tidung-island",
    "color": null,
    "preTitle": "Beaches",
    "title": "Tidung Island",
    "buildings": null,
    "stars": null,
    "subtitle": null,
    "description":
      "Located relatively close to the capital city of Jakarta, you wouldn\u2019t have to spend unnecessary time and money just trying to get to Tidung Island. For Jakarta-dwellers looking for a simple and affordable weekend getaway, Tidung offers secluded beaches, starry nights and an amiable community, just a stone\u2019s throw away from the capital.",
    "places": null,
    "pois": null,
    "longitude": "106.496018",
    "latitude": "-5.797094",
    "price": "1500000"
  },
  {
    "imageURL":
      "https://i0.wp.com/www.balistarisland.com/wp-content/uploads/2016/10/bidadariislandkomodo.jpg?fit=1200%2C650&ssl=1",
    "url": "http://www.indonesia.travel/en/destination/point-of-interest/bidadari-island",
    "color": null,
    "preTitle": "Beaches",
    "title": "Bidadari Island",
    "buildings": null,
    "stars": null,
    "subtitle": null,
    "description":
      "The island gained its name because long ago, no one was allowed to visit the island unless they were of royal blood of Jayakarta. Hence the name, Pulau Bidadari, literally translated meaning The Island of Angels. With only 6 hectares in area, Pulau Bidadari is a small island. You could walk from one end to the other in under two hours. The beaches of Pulau Bidadari display beautiful, white, sand, and crystal clear sea water.",
    "places": null,
    "pois": null,
    "longitude": "106.746941",
    "latitude": "-6.035613",
    "price": "1500000"
  }
];



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
  render() {
    const {classes} = this.props;
    const {history} = this.props;

    let Cards = [];
    data.forEach(item => {
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
            onRequestSearch={(value) => {
            	index.search(value, function(err, content) {
				  alert(JSON.stringify(content.hits[0]));
				});
            }}
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