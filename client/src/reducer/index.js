import { GET_VIDEOGAMES, SEARCH_VIDEOGAME, SORT } from '../actions';
import { ASCENDENTE } from '../constants/sort.js';

const initialState = {
    videogames : [],
    filteredVideogames: []
  };

  export default function reducer(state = initialState, action) {
      switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                filteredVideogames: action.payload
            }
        case SEARCH_VIDEOGAME:
            return {
                ...state,
                filteredVideogames: action.payload
            }    
        case SORT:
            let orderedVideogames = [...state.videogames]
            orderedVideogames = orderedVideogames.sort((a, b) => {
                if(a.name < b.name) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if(a.name > b.name) {
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0
            })
            return{
                ...state,
                filteredVideogames: orderedVideogames
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
  


  