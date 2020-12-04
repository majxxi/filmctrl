import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: 5 + 'rem',
    justifyContent: 'center',
    backgroundColor: 'white',
    minWidth: 100,
    maxWidth: 600,
    borderRadius: 10 + 'px',
    marginLeft: 1 + 'rem'
  }
}));

function FilmRanking() {
  const classes = useStyles();
  const [ranking, setRanking] = useState();

  useEffect(function getFilmRankingOnMount() {
    async function getFilmRanking() {
      const response = await axios.get(`http://localhost:5000/`);
      setRanking(response.data['ranking']);
    }
    if(!ranking) {
      getFilmRanking();
    }
  }, [ranking]);

  return (
    <TableContainer component='div'>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>FILMS</TableCell>
            <TableCell align="right">YEAR</TableCell>
            <TableCell align="right">LIKES</TableCell>
            <TableCell align="right">DISLIKES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking?.sort((a,b) => b.likes - a.likes).map((film) => (
            <TableRow key={film.film_id}>
              <TableCell component="th" scope="row">
                {film.title}
              </TableCell>
              <TableCell align="right">{film.year}</TableCell>
              <TableCell align="right">{film.likes}</TableCell>
              <TableCell align="right">{film.dislikes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FilmRanking;