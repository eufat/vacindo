import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { partition } from 'lodash';

import { FormControl } from 'material-ui/Form';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import VacindoCard from '../../components/VacindoCard';

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
    priceFrom: 3000000,
    priceTo: 5000000,
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
    priceTo: 3000000,
  },
  {
    image: 'https://i.ytimg.com/vi/7ead5Ti7zNg/maxresdefault.jpg',
    title: 'Komodo Island',
    city: 'Komodo Island',
    place: 'Komodo Island',
    priceFrom: 3000000,
    priceTo: 5000000,
  },
];

const styleSheet = theme => ({
  icon: {
    margin: theme.spacing.unit,
  },
  headContainer: {
    backgroundImage: 'url("/static/images/head.jpg")',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '100vh',
    margin: 0,
    paddingTop: '20vw',
    paddingBottom: '20vw',
  },
  filter: {
    top: 0,
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5
  },
  experienceContainer: {
    margin: '0 auto',
  },
  paper: {
    padding: 20,
    minHeight: 200,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  headSearch: {
    backgroundColor: 'white',
  },
});

class Web extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    const partitionedData = partition(data, n => n % 3);

    const ExperienceRow = d => 
      d.map((item, i) => (
        <Grid item md={4} sm={4} xs={4}>
          <VacindoCard
            cardImage={item.image}
            cardTitle={item.title}
            miniHeadline={item.city}
            mainHeadline={item.place}
            priceRange={`Rp${(item.priceFrom).toLocaleString('id')} - Rp${(item.priceTo).toLocaleString('id')}`}
          />
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
      <span>
        {/*<div className={classes.headContainer}>
                  <div className={classes.filter}></div>
                  <Grid container justify="center" align="flex-start">
                    <Grid item md={6} sm={6} xs={12}>
                      <FormControl fullWidth className={classes.headSearch}>
                        <Input
                          placeholder="Search destination"
                          id="adornment-amount"
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon className={classes.icon} />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>*/}
        <div>
          <Grid className={classes.experienceContainer}>{ExperienceContent}</Grid>
        </div>
      </span>
    );
  }
}

Web.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(withStyles(styleSheet)(Web));