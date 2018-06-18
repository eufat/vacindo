import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    padding: 0,
    fontFamily: "'Enriqueta', arial, serif",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  kota: {
    fontSize: '0.7em',
  },
  judul: {
    fontFamily: "'Enriqueta', arial, serif",
    fontSize: '1em',
  },
};

class VacindoCard extends Component {
  render() {
    const { classes, data } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={data.imageURL} title={data.title} />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h3" className={classes.kota}>
              <b>{data.preTitle.toUpperCase()}</b>
            </Typography>
            <Typography gutterBottom variant="headline" component="h2" className={classes.judul}>
              <b>{data.title}</b>
            </Typography>
            <Typography component="p">Rp{Number(data.price).toLocaleString('id-ID')}</Typography>
          </CardContent>
          <CardActions>{this.props.children}</CardActions>
        </Card>
      </div>
    );
  }
}

VacindoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VacindoCard);
