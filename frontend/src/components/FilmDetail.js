import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getFilmFromAPI, sendVoteToAPI } from '../actions/films';
import defaultPhoto from './images/no_image.png';

import {
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';
import VoteButton from './VoteButton';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: 3 + 'rem',
    fontWeight: 200,
    marginBottom: 20,
    marginTop: 20,
  },
  img: {
    margin: 'auto',
    justifyContent: 'flex-start',
    width: 300,
  },
  card: {
    display: 'flex',
    marginTop: 3 + 'rem',
    borderRadius: 5 + 'px',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'center',
    padding: 1 + 'rem',
    backgroundColor: '#66a5b0',
  },
  plot: {
    maxWidth: 350,
  },
  box: {
    backgroundColor: '#66a5b0'
  },
  loading: {
    marginTop: 5 + 'rem'
  }
}));

function FilmDetail({id}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { filmId } = useParams();
  id = id ? id : filmId;
  const { films } = useSelector(st => st.films);
  const film = films.filter(film => film.imdbID === id);
  const [loading, setLoading] = useState(false);

  useEffect(function getFilmOnMount() {
    async function getFilm() {
      setLoading(true)
      await dispatch(getFilmFromAPI(id));
      setLoading(false)
    }
    if(id) {
      getFilm();
    }
  }, [dispatch, id]);

  function vote(direction) {
    let title = film[0].Title;
    let year = film[0].Released;
    dispatch(sendVoteToAPI(id, direction, title, year));
  }

  return (
    <Box component="div" className={classes.box}>
      {loading && !film ? <h1>Loading...</h1> :
        <>
          <Grid        
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center" 
            className={classes.card}
          >
            <Grid item>
              <CardMedia
                className={classes.img}
                component="img"
                src={film[0].Poster !== 'N/A' ? film[0].Poster : defaultPhoto}
                image={film[0].Poster !== 'N/A' ? film[0].Poster : defaultPhoto}
                alt={film[0].Title}
              />
            </Grid>
            <Grid item>
              <CardContent component="div">
                {/* <p variant="h1" className={classes.title}>{data.Title}</p> */}
                <Typography variant="h4">Director:</Typography>
                <p>{film[0].Director}</p>
                <Typography variant="h4">Release Date:</Typography>
                <p>{film[0].Released ? film[0].Released : "Unknown"}</p>
                <Typography variant="h4">Plot:</Typography>
                <p className={classes.plot}>{film[0].Plot ? film[0].Plot : "N/A"}</p>
              </CardContent>
            </Grid>
            <VoteButton vote={vote} />
          </Grid>
        </>
      }
    </Box>
  )
}

export default FilmDetail;