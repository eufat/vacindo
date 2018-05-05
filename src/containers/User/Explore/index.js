import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import SearchIcon from '@material-ui/icons/Search';
import partition from 'lodash/partition';
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

  const partitionedData = partition(data, n => n % 4);

  const ExperienceRow = d =>
    d.map((item, i) => (
      <Grid item md={3} sm={3} xs={3}>
        <VacindoCard data={item}>
          <VacindoCardDetails data={item}>View Destination</VacindoCardDetails>
        </VacindoCard>
      </Grid>
    ));

  const ExperienceContent = partitionedData.map((item, i) => (
    <div>
      <Grid container justify="center" align="flex-start">
        {ExperienceRow(item)}
      </Grid>
    </div>
  ));

  return (
    <div>
      <Typography type="title">Explore</Typography>
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
      <div className={props.classes.classes}>{ExperienceContent}</div>
      <VacindoStepButtons beforeLink="/user/ticket" last />
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
