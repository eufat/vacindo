import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux';

import VacindoStepButtons from '../components/VacindoStepButtons';
import VacindoCard from '../../../components/VacindoCard';
import VacindoCardDetails from './components/VacindoCardDetails';

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

function Explore(props) {
  const data = props.destinations;

  let Cards = [];
  data.forEach((item) => {
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
      <div className={props.classes.container}>
        <Grid container justify="center" align="flex-start">
          <Grid item md={6} sm={6} xs={12}>
            <FormControl fullWidth className={props.classes.headSearch}>
              <Input
                preTitleholder="Search destination"
                id="adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon className={props.classes.icon} />
                  </InputAdornment>
                }
              />
            </FormControl>
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
