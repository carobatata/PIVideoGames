import { useDispatch, useSelector } from 'react-redux';
import { filterGenre} from '../actions/index.js';
import { useEffect } from 'react';

export default function FilterByGenre() {

    const videogames = useSelector((state) => state.filteredVideogames)
    const genres = useSelector((state) => state.genres)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterGenre());
      }, []);

    function handleFilterGenre(e) {
        dispatch(filterGenre(e.target.value))
    };

    return (
        <select onChange={handleFilterGenre}>
            {videogames.map((g) => (
                <option value={g.genres}>{g.genres}</option>
            ))}
        </select>
    )
};