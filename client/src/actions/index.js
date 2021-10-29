  const axios = require('axios');
  export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
  export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';
  export const FILTER_CREATED = 'FILTER_CREATED';
  export const SORT = 'SORT';
  export const GET_GENRES = 'GET_GENRES';
  export const RATING_SORT = 'RATING_SORT';
  export const POST_VIDEOGAME = 'POST_VIDEOGAME';
  export const FILTER_GENRE = 'FILTER_GENRE';
  export const GET_PLATFORMS = 'GET_PLATFORMS';

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

export function filterGenre(search){
    return function(dispatch){
        axios.get(`http://localhost:3001/videogames?genre=${search}`)
        .then((videogame) => {
            dispatch({
                type: FILTER_GENRE,
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

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload,
    }
}

export function ratingSort(payload) {
    return {
        type: RATING_SORT,
        payload,
    }
}


// export function filterGenre(payload) {
//     return {
//         type: FILTER_GENRE,
//         payload,
//     }
// }

export function postVideogame(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogame', payload);
        console.log(response);
        return dispatch ({
            type: POST_VIDEOGAME,
            payload: response
        })
    }
};

export function getPlatforms() {
    return async function(dispatch) {
        var platforms = await axios('http://localhost:3001/platforms', {
        })
        return dispatch({
            type: GET_PLATFORMS,
            payload: platforms.data
        })
    }
}