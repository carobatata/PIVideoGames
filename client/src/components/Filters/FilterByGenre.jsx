import { useDispatch } from 'react-redux';
import { filterGenre, getGenres } from '../../actions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function FilterByGenre() {

    const genres = useSelector((state) => state.genres)


    const dispatch = useDispatch();

    function handleSelectChange(e) {
        e.preventDefault();
        dispatch(filterGenre(e.target.value))
    }

    useEffect(() => {
        dispatch(getGenres());
      }, []);

    return(
        <div>
        <select name="Genre Filter" onChange={handleSelectChange}>
            {genres.map((g) =>(
                <option value={g.name}>{g.name}</option>
              ))}
        </select>
     </div>
    )
};