import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import VacindoCard from '../../components/VacindoCard';
import {withStyles} from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';

// Buat AppBar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';



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
  }
];



const styles = theme => ({
  appbar: {
    backgroundColor: '#000',
    opacity: 0.5
  },
  flex: {
    flex: 1
  },
  jumbotron: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundImage: 'url("/static/images/head.jpg")',
    backgroundPosition: 'center',
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
    fontSize: '40px'
  },
  searchBarContainer: {
    padding: '0 20px'
  }
});



class Web extends Component {
  render() {
    const {classes} = this.props;
    let Cards = [];
    data.forEach(item => {
      Cards.push(
        <Grid item xs={12} sm={4}>
          <VacindoCard
            cardImage={item.image}
            cardTitle={item.title}
            miniHeadline={item.city}
            mainHeadline={item.place}
            priceRange={`Rp${(item.priceFrom).toLocaleString('id')} - Rp${(item.priceTo).toLocaleString('id')}`}
          />
        </Grid>
      )
    });

    const appbar = (
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Vacindo
          </Typography>
          <Button color="inherit">Become a Tour Guide</Button>
          <Button color="inherit">Sign Up</Button>
          <Button color="inherit">Login</Button>
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
            onRequestSearch={() => console.log('onRequestSearch')}
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
        
        {/* Content */}
        <div style={{ padding: '20px 50px', marginTop: '100vh' }}>
          <Typography variant="title">
            Experience travelers love
          </Typography>
          <Typography variant="subheading" gutterBottom style={{marginBottom: 20}}>
            Book vacation led by tour guides on your next trip
          </Typography>

          {/* Cards */}
          <Grid container spacing={24}>
            {Cards}
          </Grid>
        </div>

        <Footer/>
      </span>
    );
  }
}



export default withStyles(styles)(Web);