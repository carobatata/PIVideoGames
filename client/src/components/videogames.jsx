import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../actions/index.js';
import Videogame from './videogame';

export default function Videogames() {
    let videogames = useSelector((state) => state.filteredVideogames);
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
