import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchVideogame } from '../../actions';
import s from './SearchBar.module.css';

export default function SearchBar() {
    
    const [search, setSearch] = useState('');
    let dispatch = useDispatch();

    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchVideogame(search));
    }
    
    function onChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return(
        <div className={s.container}>
            <form  onSubmit={onSubmit}>
                <input className={s.searchbar} type="text" value={search} onChange={onChange} />
                <input className={s.button} type="submit" value="Search" />
            </form> 
        </div>
    )
}