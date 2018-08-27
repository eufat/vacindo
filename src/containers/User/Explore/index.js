/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchBar from 'material-ui-search-bar';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux';
import algoliasearch from 'algoliasearch/lite';
import values from 'lodash/values';

import VacindoStepButtons from '../components/VacindoStepButtons';
import VacindoCard from '../../../components/VacindoCard';
import VacindoCardDetails from './components/VacindoCardDetails';

import { retrieveUserDestinations } from '../actions';

const clientAlgolia = algoliasearch('NG4EKIHD89', 'f945cd0b9d03ef383d2ab2c8e4b7adc9');
const index = clientAlgolia.initIndex('index');

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
  searchBar: {
    margin: '0 auto',
    maxWidth: 800,
  },
  exploreCardsContainer: {
    padding: 20,
  },
});

class Explore extends Component {
  state = {
    destinations: {},
    onProgress: false,
  }

  componentDidMount() {
    this.retrieveData();
  }

  handleSearch = (value) => {
    index.search(value, (err, content) => {
      const newData = content.hits;
      this.setState({ ...this.state, destinations: newData });
    });
  }

  retrieveData = () => {
    const { dispatch } = this.props;
    this.setState({ ...this.state, onProgress: true }, () => {
      dispatch(retrieveUserDestinations((destinations) => {
        this.setState({
          ...this.state,
          destinations,
          onProgress: false
        });
      }));
    });
  }

  render() {
    const { classes } = this.props;
    const Cards = [];

    let { destinations } = this.state;
    destinations = values(destinations);

    destinations.forEach((item) => {
      const destinationComponent = () => (
        <Grid item xs={12} sm={4}>
          <VacindoCard data={item}>
            <CardActions>
              <VacindoCardDetails data={item}>View Destination</VacindoCardDetails>
            </CardActions>
          </VacindoCard>
        </Grid>
      );

      Cards.push(destinationComponent());
    });

    return (
      <div className={classes.exploreCardsContainer}>
        <Typography variant="title">Explore</Typography>
        <div className={this.props.classes.container}>
          <Grid container justify="center" align="flex-start">
            <Grid item md={4} sm={4} xs={12}>
              <SearchBar
                onRequestSearch={value => this.handleSearch(value)}
                className={classes.searchBar}
              />
            </Grid>
          </Grid>
        </div>
        {
          this.state.onProgress ?
            <center>
              <CircularProgress className={classes.progress} />
            </center> :
            <div>
              <Grid container spacing={16}>
                {Cards}
              </Grid>
            </div>
        }

        <VacindoStepButtons first nextLink="/user/explore" />
      </div>
    );
  }
}

Explore.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({ app }) {
  return {
    destinations: app.destinations,
  };
}

export default withStyles(styleSheet)(connect(mapStateToProps)(Explore));
