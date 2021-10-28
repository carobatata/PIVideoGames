  const axios = require('axios');
  export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
  export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';
  export const FILTER_CREATED = 'FILTER_CREATED';
  export const SORT = 'SORT';
  export const GET_GENRES = 'GET_GENRES';
  export const FILTER_GENRE = 'FILTER_GENRE';

  export function getVideogames(){
      return function(dispatch){
          axios.get('http://localhost:3001/videogames')
          .then((videogames) => {
              dispatch({
                  type: GET_VIDEOGAMES,
                  payload: videogames.data
              })
          })
          .catch((error) => {
            console.log(error);
        })
      }
  }

  export function searchVideogame(search){
    return function(dispatch){
        axios.get(`http://localhost:3001/videogames?name=${search}`)
        .then((videogame) => {
            dispatch({
                type: SEARCH_VIDEOGAME,
                payload: videogame.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
};

export function getGenres() {
    return async function(dispatch) {
        var genres = await axios('http://localhost:3001/genres', {
        })
        return dispatch({
            type: GET_GENRES,
            payload: genres.data
        })
    }
}

export function sort(payload) {
    return {
        type: SORT,
        payload,
    }
}

export function filterGenre(payload) {
    return {
        type: FILTER_GENRE,
        payload,
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload,
    }
}

