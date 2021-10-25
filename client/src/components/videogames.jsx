import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../actions/index.js';
import Videogame from './videogame';
// import { connect } from 'react-redux';


export default function Videogames() {
    let videogames = useSelector((state) => state.videogames);
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getVideogames())
    }, [])

    console.log(videogames);

    return (
        <div>
            {videogames.map((videogame) => {
                return <Videogame image={videogame.image} name={videogame.name} 
                // genres={videogame.genres}
                />
            })}
        </div>
    )
}


//   function mapStateToProps(state) {
//     return {
//       videogames: state.videogames,
//     }
//   };
  
  
//   export default connect(mapStateToProps, { getVideogames} ) (Videogames);
