  const axios = require('axios');
  export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
  export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';
  export const SORT = 'SORT';

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
}

export function sort(order) {
    return {
        type: SORT,
        payload: order,
    }
}
