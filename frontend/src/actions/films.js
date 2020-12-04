import axios from 'axios';
import {
  FETCH_FILMS,
  FETCH_FILM,
  VOTE,
  FETCH_VOTED_FILMS
} from './types';

const API_URL = process.env.BASE_URL || "http://localhost:5000/movies";

export function getVotedFilmsFromAPI() {
  return async function(dispatch) {
    const response = await axios.get(`http://localhost:5000/`);
    return dispatch(getVotedFilms(response.data));
  }
}

function getVotedFilms(votedFilms){
  return {
    type: FETCH_VOTED_FILMS,
    votedFilms
  }
}

export function getFilmsFromAPI(search, page) {
  return async function (dispatch) {

    let response = {};
    if(!page) {
      response = await axios.get(`${API_URL}?search=${search}`)
                            .catch(function (error) {
                              if (error.response) {
                                return error.response.data;
                            }});
    } else {
      response = await axios.get(`${API_URL}?search=${search}&page=${page}`)
                            .catch(function (error) {
                              if (error.response) {
                                return error.response.data;
                            }});
    }
    let data = response.data;
    response = typeof response === 'string' ? response : undefined;
    return dispatch(getFilms(data, response));
  };
};

function getFilms(films, error) {
  return {
    type: FETCH_FILMS,
    films,
    error
  };
};

export function getFilmFromAPI(id) {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/${id}`)
                                .catch(function (error) {
                                  if (error.response) {
                                    return error.response.data;
                                }});
    return dispatch(getFilm(response.data));
  };
};

function getFilm(film) {
  return {
    type: FETCH_FILM,
    film,
  };
};

export function sendVoteToAPI(id, direction, title, year) {
  return async function(dispatch) {

    const options = {
      url: `${API_URL}/${id}/vote/${direction}`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": "Bearer",
      },
      data: {
        title: title,
        year: year
      }
    };
    const response = await axios(options);
    return dispatch(voteOnFilm(id, response.data));
  };
};

function voteOnFilm(id, newVotesCount) {
  return {
    type: VOTE,
    id,
    newVotesCount
  };
};