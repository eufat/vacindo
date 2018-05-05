import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    padding: 0,
    fontFamily: "'Enriqueta', arial, serif"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  kota: {
    fontSize: '0.7em'
  },
  judul: {
    fontFamily: "'Enriqueta', arial, serif",
    fontSize: '1em'
  }
};

function VacindoCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={props.cardImage} title={props.cardTitle} />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h3" className={classes.kota}>
            <b>{(props.miniHeadline).toUpperCase()}</b>
          </Typography>
          <Typography gutterBottom variant="headline" component="h2" className={classes.judul}>
            <b>{props.mainHeadline}</b>
          </Typography>
          <Typography component="p">{props.priceRange}</Typography>
        </CardContent>
        <CardActions>{props.children}</CardActions>
      </Card>
    </div>
  );
}

VacindoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VacindoCard);
