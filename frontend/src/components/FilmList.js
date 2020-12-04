import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFilmsFromAPI } from '../actions/films';
import { makeStyles, Select, Grid, Box } from '@material-ui/core';
import Alert from './Alert';
import FilmCard from './FilmCard';

const useStyles = makeStyles(theme => ({
  select: {
    marginTop: 5 + 'rem',
    marginBottom: 2 + 'rem',
    backgroundColor: 'white',
    borderRadius: 5 + 'px'
  }
}))

function FilmList({search}) {
  const classes = useStyles();
  const { films } = useSelector(st => st.films);
  const totalResults = useSelector(st => st.films.totalResults);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);

  const error = useSelector(st => st.films.error);

  const changePage = async(event) => {
    const page = event.target.value;
    setLoading(true);
    await dispatch(getFilmsFromAPI(search, page));
    setLoading(false);
  }
  
  let totalPages = Number(totalResults)/10;
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(function getFilmsOnMount() {
    async function getFilms(search) {
      setLoading(true);
      await dispatch(getFilmsFromAPI(search));
      setLoading(false);
    }
    if (search) {
      getFilms(search);
    }
    if(error) {
      setAlert(error);
      setLoading(false);
    } else {
      setAlert(null);
    }
  }, [dispatch, error, search]);

  return (
    <>
    <Box>
      <Grid 
        container         
        direction="row"
        justify="center"
        alignItems="center" 
      >
        {pages.length === 0 ? null :
          <Select onChange={changePage} defaultValue={''} className={classes.select}>
              {pages.map(num => {
                return <option key={num} value={num}>{num}</option>
              })}
          </Select>
        }
      </Grid>
      {alert ? <Alert message={alert} /> : null}
      {loading ? <h1>Loading...</h1> : 
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
    
        {!films ? null : films.map(film => (
          <FilmCard
            title={film.Title}
            image={film.Poster}
            id={film.imdbID}
            key={film.imdbID}
          />
        ))}
        </Grid>
      }
    </Box>
    </>
  )
}

export default FilmList;