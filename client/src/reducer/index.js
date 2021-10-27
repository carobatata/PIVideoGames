import { FILTER_CREATED, GET_VIDEOGAMES, SEARCH_VIDEOGAME, SORT } from '../actions';

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
                    return action.payload === 'ascendente' ? -1 : 1;
                }
                if(a.name > b.name) {
                    return action.payload === 'ascendente' ? 1 : -1;
                }
                return 0
            })
            return{
                ...state,
                filteredVideogames: orderedVideogames
            }
        case FILTER_CREATED:
            let allVideogames = [...state.videogames];
            let filterCreated = action.payload === 'created' ? allVideogames.filter(v => v.createdInDb) : allVideogames.filter(v => !v.createdInDb);
            return{
                ...state,
                filteredVideogames: filterCreated,
                // filteredVideogames: action.payload === 'All'? state.allVideogames : filterCreated,

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
  


  