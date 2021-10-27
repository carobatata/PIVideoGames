import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../actions/index.js';
import { Link } from 'react-router-dom';
import Videogame from './Videogame';

export default function Videogames() {

    let videogames = useSelector((state) => state.filteredVideogames); //lo mismo que hacer el mapState

    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getVideogames()) //map dispatch to Props
    }, [])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

    return (
        <div>
            <Link to='addVideogame'>Create yours</Link>
            <h6>Videogames World</h6>
            <button onClick={e=> {handleClick(e)}}>Reset Videogames</button>

            {videogames.map((videogame) => {
                return <Videogame 
                    id={videogame.id}
                    image={videogame.image} 
                    name={videogame.name}
                    genres={videogame.genres}
                />
            })}

        </div>
    )
}
