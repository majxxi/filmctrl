import {
  FETCH_FILMS,
  FETCH_FILM,
  VOTE,
} from "../actions/types";

export default function rootReducer(state = {films: []}, action) {

  switch (action.type) {

    case FETCH_FILMS:
      {
        const filmsCopy = action.films ? [...action.films.Search] : [];
        const errorCopy = action.error;
        return { ...state, films: filmsCopy, totalResults: action.films?.totalResults, error: errorCopy };
      }

    case FETCH_FILM:
      {
        let index = state.films.findIndex(film => film.imdbID === action.film.imdbID);
        const newArray = [...state.films];
        index = index === -1 ? 0 : index;
        newArray[index] = action.film;
        return { ...state, films: newArray }
      }

    case VOTE:
      {
        const index = state.films.findIndex(film => film.imdbID === action.id);
        const newArray = [...state.films];
        newArray[index] = {...newArray[index], likes: action.newVotesCount};
        return { ...state, films: newArray };
      }

    default:
      return state;
  }
}
