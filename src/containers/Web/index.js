import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import VacindoCard from '../../components/VacindoCard';
import {withStyles} from 'material-ui/styles';



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
  jumbotron: {
    backgroundImage: 'url("/static/images/head.jpg")',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '100vh',
    margin: 0,
    paddingTop: '20vw',
    paddingBottom: '20vw',
  }
});



class Web extends Component {
  render() {
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
    
    return (
      <span>
        <div className="jumbotron">
        </div>
        <div style={{ padding: 20 }}>
          <Grid container spacing={16}>
            {Cards}
          </Grid>
        </div>
      </span>
    );
  }
}



export default withStyles(styles)(Web);