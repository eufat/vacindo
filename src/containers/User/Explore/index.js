import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import SearchIcon from '@material-ui/icons/Search';
import partition from 'lodash/partition';
import VacindoStepButtons from '../components/VacindoStepButtons';

import VacindoCard from '../../../components/VacindoCard';
import VacindoCardDetails from './components/VacindoCardDetails';

const data = [
  {
    image:
      'https://3.bp.blogspot.com/-rpbABXJi17I/VzZPdXEZSJI/AAAAAAAARzU/IDjTcfKszC04rMyxZeylUaVAzytssmeggCLcB/s1600/9%2BGedung%2BPerpustakaan%2BTerbaik%2BIndonesia%2B%2521%2B1.jpg',
    title: 'Universitas Indonesia',
    city: 'Depok',
    place: 'Universitas Indonesia',
    priceFrom: 500000,
    priceTo: 1500000,
  },
  {
    image: 'https://blog.misteraladin.com/wp-content/uploads/2015/09/paralayang-puncak-1.jpg',
    title: 'Puncak',
    city: 'Bogor',
    place: 'Puncak',
    priceFrom: 1500000,
    priceTo: 3000000,
  },
  {
    image: 'https://s3-eu-west-1.amazonaws.com/virtusvita-images/Destination/xlarge/bali1.jpg',
    title: 'White Sand Beach',
    city: 'Bali',
    place: 'White Sand Beach',
    priceFrom: 300000,
    priceTo: 500000,
  },
  {
    image: 'https://www.pegipegi.com/travel/wp-content/uploads/2016/08/lawang-sewu-horor.jpg',
    title: 'Lawang Sewu',
    city: 'Semarang',
    place: 'Lawang Sewu',
    priceFrom: 1500000,
    priceTo: 2000000,
  },
  {
    image:
      'https://www.pikniek.com/wp-content/uploads/2017/10/000024-00_wisata-kota-tua-jakarta_kota-tua_800x450_ccpdm-min.jpg?x58194',
    title: 'Kota Tua',
    city: 'Jakarta',
    place: 'Kota Tua',
    priceFrom: 1500000,
    priceTo: 300000,
  },
  {
    image: 'https://i.ytimg.com/vi/7ead5Ti7zNg/maxresdefault.jpg',
    title: 'Komodo Island',
    city: 'Komodo Island',
    place: 'Komodo Island',
    priceFrom: 300000,
    priceTo: 500000,
  },
];

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
  const partitionedData = partition(data, n => n % 4);

  const ExperienceRow = d =>
    d.map((item, i) => (
      <Grid item md={3} sm={3} xs={3}>
        <VacindoCard
          cardImage={item.image}
          cardTitle={item.title}
          miniHeadline={item.city}
          mainHeadline={item.place}
          priceRange={`${item.priceFrom}-${item.priceTo}`}
        >
          <VacindoCardDetails
            cardImage={item.image}
            cardTitle={item.title}
            miniHeadline={item.city}
            mainHeadline={item.place}
            priceRange={`${item.priceFrom}-${item.priceTo}`}
          >
            View Destination
          </VacindoCardDetails>
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
                placeholder="Search destination"
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
};

export default withStyles(styleSheet)(Explore);
