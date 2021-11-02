import { FILTER_CREATED, GET_VIDEOGAMES, SEARCH_VIDEOGAME, ALPHABETICAL_SORT, GET_GENRES, FILTER_GENRE, RATING_SORT, POST_VIDEOGAME } from '../actions';

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
                genres: action.payload
            }
        case POST_VIDEOGAME:
            return{
                ...state,
            }
        case ALPHABETICAL_SORT:
            let orderedVideogames = [...state.filteredVideogames];
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
        case RATING_SORT:
            let orderedRatings = [...state.filteredVideogames]
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
        case FILTER_CREATED:
            let allVideogames = [...state.videogames];
            const filterCreated = action.payload === 'created' ? allVideogames.filter(v => v.createdInDb) : allVideogames.filter(v => !v.createdInDb);
            return{
                ...state,
                filteredVideogames: filterCreated
                // filteredVideogames: action.payload === 'all'? state.allVideogames: filterCreated

                }
        default:
            return state;
      }  
    };
    
   