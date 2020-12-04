import React, { useState } from 'react';
import { 
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid
} from '@material-ui/core';
import FilmDialog from './FilmDialog';
import defaultPhoto from './images/no_image.png';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  card: {
    padding: 0,
    margin: 'none'
  },
  title: {
    marginTop: -20,
    marginBottom: -10,
  }
}));

function FilmCard({id, image, title}){
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <Grid item className={classes.root} xs={12} sm={8} md={6} key={id}>
      <Card elevation={20} className={classes.card}>
        <Button color="primary" onClick={handleOpen}>
          <CardMedia 
            className={classes.img}
            component="img"
            src={image}
            image={image !== 'N/A' ? image : defaultPhoto}
            alt={title}
          />
        </Button>
        {!open ? null : 
          <FilmDialog title={title} id={id} close={handleClose} open={open} />
        }
        <CardContent>
          <Typography className={classes.title} variant="subtitle1" component="h2" noWrap>
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default FilmCard;