  const axios = require('axios');
  export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';

  export function getVideogames(){
      return function(dispatch){
          axios.get('http://localhost:3001/videogames')
          .then((videogames) => {
              dispatch({
                  type: GET_VIDEOGAMES,
                  payload: videogames.data
              })
          })
      }
  }

//   export function addMovieFavorite(payload) {
//     return { type: "ADD_MOVIE_FAVORITE", payload }; //oayload es la peli a
//   }

//   export function removeMovieFavorite(payload) {
//     return { type: "REMOVE_MOVIE_FAVORITE", payload };
//   }
  
//   export function getMovieDetail(idMovie) {
//     return function(dispatch) {
//         return fetch("http://www.omdbapi.com/?apikey=20dac387&i=" + idMovie)
//           .then(response => response.json())
//           .then(json => {
//             dispatch({ type: "GET_MOVIE_DETAIL", payload: json });
//           });
//       };
//   }

