import { useDispatch } from 'react-redux';
import { filterGenre, getGenres } from '../../actions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import s from  './FilterByGenre.module.css';


export default function FilterByGenre() {

    const genres = useSelector((state) => state.genres)


    const dispatch = useDispatch();

    function handleSelectChange(e) {
        e.preventDefault();
        dispatch(filterGenre(e.target.value))
    }

    useEffect(() => {
        dispatch(getGenres());
      }, [dispatch]);

    return(
        <div>
            <select className={s.select} name="Genre Filter" onChange={handleSelectChange}>
             <option value="none" selected disabled hidden>Genre</option>
                {genres.map((g) =>(
                    <option key={g.id} value={g.name}>{g.name}</option>
                ))}
            </select>
     </div>
    )
};