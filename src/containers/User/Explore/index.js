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

const data1 = [
  {
    imageURL:
      'https://3.bp.blogspot.com/-rpbABXJi17I/VzZPdXEZSJI/AAAAAAAARzU/IDjTcfKszC04rMyxZeylUaVAzytssmeggCLcB/s1600/9%2BGedung%2BPerpustakaan%2BTerbaik%2BIndonesia%2B%2521%2B1.jpg',
    title: 'Universitas Indonesia',
    preTitle: 'Depok',
    preTitle: 'Universitas Indonesia',
    price: 500000,
  },
  {
    imageURL: 'https://blog.misteraladin.com/wp-content/uploads/2015/09/paralayang-puncak-1.jpg',
    title: 'Puncak',
    preTitle: 'Bogor',
    preTitle: 'Puncak',
    price: 1500000,
  },
  {
    imageURL: 'https://s3-eu-west-1.amazonaws.com/virtusvita-images/Destination/xlarge/bali1.jpg',
    title: 'White Sand Beach',
    preTitle: 'Bali',
    preTitle: 'White Sand Beach',
    price: 300000,
  },
  {
    imageURL: 'https://www.pegipegi.com/travel/wp-content/uploads/2016/08/lawang-sewu-horor.jpg',
    title: 'Lawang Sewu',
    preTitle: 'Semarang',
    preTitle: 'Lawang Sewu',
    price: 300000,
  },
  {
    imageURL:
      'https://www.pikniek.com/wp-content/uploads/2017/10/000024-00_wisata-kota-tua-jakarta_kota-tua_800x450_ccpdm-min.jpg?x58194',
    title: 'Kota Tua',
    preTitle: 'Jakarta',
    preTitle: 'Kota Tua',
    price: 1500000,
  },
  {
    imageURL: 'https://i.ytimg.com/vi/7ead5Ti7zNg/maxresdefault.jpg',
    title: 'Komodo Island',
    preTitle: 'Komodo Island',
    preTitle: 'Komodo Island',
    price: 300000,
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
  const data = props.destinations;

  const partitionedData = partition(data, n => n % 4);

  const ExperienceRow = d =>
    d.map((item, i) => (
      <Grid item md={3} sm={3} xs={3}>
        <VacindoCard
          cardImage={item.imageURL}
          cardTitle={item.title}
          miniHeadline={item.preTitle}
          mainHeadline={item.title}
          price={item.price}
        >
          <VacindoCardDetails
            cardImage={item.imageURL}
            cardTitle={item.title}
            miniHeadline={item.preTitle}
            mainHeadline={item.title}
            description={item.description}
            priceRange={item.price}
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
