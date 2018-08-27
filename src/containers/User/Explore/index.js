import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchBar from 'material-ui-search-bar';
import SearchIcon from '@material-ui/icons/Search';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux';

import VacindoStepButtons from '../components/VacindoStepButtons';
import VacindoCard from '../../../components/VacindoCard';
import VacindoCardDetails from './components/VacindoCardDetails';

// Data Destinasi
import dummy from '../../../utils/dummy.json';

// Algolia
var algoliasearch = require('algoliasearch');
var algoliasearch = require('algoliasearch/reactnative');
var algoliasearch = require('algoliasearch/lite');
var clientAlgolia = algoliasearch('NG4EKIHD89', 'f945cd0b9d03ef383d2ab2c8e4b7adc9');
var index = clientAlgolia.initIndex('index');

const styleSheet = theme => ({
  container: {
    paddingTop: '100px',
    paddingBottom: '100px',
    marginTop: theme.spacing.unit * 3,
  },
  icon: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    textDecoration: 'none',
  },
  input: {
    display: 'none',
  },
  anchor: {
    textDecoration: 'none',
  },
});

class Explore extends Component {
  state = {
    data: this.props.destinations
  }

  handleSearch = (value) => {
    index.search(value, (err, content) => {
      const newData = content.hits;
      this.setState({ ...this.state, data: newData});
    })
  }

  render() {
    let Cards = [];
    this.state.data.forEach((item) => {
      Cards.push(
        <Grid item xs={12} sm={6}>
          <VacindoCard data={item}>
            <CardActions>
              <VacindoCardDetails data={item}>View Destination</VacindoCardDetails>
            </CardActions>
          </VacindoCard>
        </Grid>
      )
    });

    return (
      <div>
        <Typography variant="title">Explore</Typography>
        <div className={this.props.classes.container}>
          <Grid container justify="center" align="flex-start">
            <Grid item md={6} sm={6} xs={12}>
              <SearchBar
                onChange={() => console.log('onChange')}
                onRequestSearch={(value) => this.handleSearch(value)}
                style={{
                  margin: '0 auto',
                  maxWidth: 800
                }}
              />
            </Grid>
          </Grid>
        </div>
          <div style={{ padding: 20 }}>
            <Grid container spacing={16}>
              {Cards}
            </Grid>
          </div>
        <VacindoStepButtons first nextLink="/user/explore" />
      </div>
    );
  }

}

Explore.propTypes = {
  classes: PropTypes.object.isRequired,
  destinations: PropTypes.array.isRequired,
};

function mapStateToProps({ app }) {
  return {
    destinations: app.destinations,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Explore));
