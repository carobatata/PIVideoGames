import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchVideogame } from '../actions';

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
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} value={search} />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}