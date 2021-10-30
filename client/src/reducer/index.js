import { FILTER_CREATED, GET_VIDEOGAMES, SEARCH_VIDEOGAME, SORT, GET_GENRES, FILTER_GENRE, RATING_SORT, POST_VIDEOGAME } from '../actions';

const initialState = {
    videogames : [],
    filteredVideogames: [],
    genres: [],
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
        case FILTER_GENRE:
            return {
                ...state,
                filteredVideogames: action.payload
            }    
        case GET_GENRES:
            return {
                ...state,
                genres:
                 action.payload
            }
        case POST_VIDEOGAME:
            return{
                ...state,
            }
        case SORT:
            let orderedVideogames = [...state.videogames];
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
            const filterCreated = action.payload === 'created' ? allVideogames.filter(v => v.createdInDb) : allVideogames.filter(v => !v.createdInDb);
            return{
                ...state,
                filteredVideogames: action.payload === 'all'? state.allVideogames: filterCreated
            }
        // case FILTER_GENRE:
        //     let allTheVideogames = [...state.videogames];
        //     let filterGenre = allTheVideogames.filter(v => v.genres === action.payload);
        //     return {
        //         ...state,
        //         filteredVideogames: filterGenre
        //     }
        case RATING_SORT:
            let orderedRatings = [...state.videogames]
            orderedRatings = orderedRatings.sort((a, b) => {
                if(a.rating < b.rating) {
                    return action.payload === 'asc' ? -1 : 1;
                }
                if(a.rating > b.rating) {
                   return action.payload === 'asc' ? 1 : -1;
                }
                return 0
                })
                return{
                    ...state,
                    filteredVideogames: orderedRatings
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
  


  