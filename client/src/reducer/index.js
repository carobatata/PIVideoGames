import { GET_VIDEOGAMES } from '../actions';

const initialState = {
    videogames : [],
    filteredVideogames: []
  };

  export default function reducer(state = initialState, action) {
      switch (action.type) {
          case GET_VIDEOGAMES:
              return {
                  ...state,
                  videogames: action.payload
              }      
          default:
              return state;
      }  
    
    };
    
    // if(action.type === "ADD_MOVIE_FAVORITE") {
    //       return {
    //           ...state,
    //           moviesFavourites: [...state.moviesFavourites, action.payload]
    //       }
    //   }
    //   if(action.type === "REMOVE_MOVIE_FAVORITE") {
    //       return {
    //           ... state,
    //           moviesFavourites: state.moviesFavourites.filter(m => m.imdbID !== action.payload)
    //       }
    //   }
    //   if(action.type === "GET_MOVIES") {
    //       return {
    //           ...state,
    //           moviesLoaded: action.payload.Search
    //       }
    //   }
    //   if(action.type === "GET_MOVIE_ DETAIL") {
    //     return {
    //         ...state,
    //         movieDetail: action.payload
    //     }
    // }
    // return state;
  


  