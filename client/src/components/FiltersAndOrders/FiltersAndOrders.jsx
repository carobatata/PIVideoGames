import { useDispatch, useSelector } from 'react-redux';
import { filterGenre, getGenres, filterCreated, alphabeticalSort, ratingSort } from '../../actions/index.js';
import s from  './FiltersAndOrders.module.css';
import { useEffect } from 'react';


export default function FiltersAndOrders({setCurrentPage}) {

    const genres = useSelector((state) => state.genres)
    const nameOrder = useSelector((state) => state.nameOrder)
    const creationFilter = useSelector((state) => state.creationFilter)
    const genreFilter = useSelector((state) => state.genreFilter)

    const dispatch = useDispatch();


    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    };

    function handleFilterGenre(e) {
        e.preventDefault();
        dispatch(filterGenre(e.target.value))
        setCurrentPage(1);
    }

    useEffect(() => {
        dispatch(getGenres());
      }, [dispatch]);
    
    function handleSelectChange(e) {
        if(e.target.value === 'ascendente' || e.target.value === 'descendente'){
            dispatch(alphabeticalSort(e.target.value))
            setCurrentPage(1);
        } else {
            dispatch(ratingSort(e.target.value))
            setCurrentPage(1);
        }
    }  

    return(
        <div>
        
            <select className={s.select} name="Order" onChange={handleSelectChange} value={nameOrder}>
                <option value='default' disabled>Orders</option>
                <option value='ascendente'>A-Z</option>
                <option value='descendente'>Z-A</option>
                <option value='asc'>Lowest to Best Rating</option>
                <option value='desc'>Best to Lowest Rating</option>
            </select>

            <select className={s.select} name="Genre Filter" onChange={handleFilterGenre} value={genreFilter}>
                <option value='default' disabled>Genres</option>
                {genres.map((g) =>(
                    <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
            </select>


            <select className={s.select} name='Creation Order' onChange={handleFilterCreated} value={creationFilter}>
                <option value='default' disabled>Created or Existed</option>
                <option value='created'>Created by me</option>
                <option value='api'>Existed</option>
            </select>

    </div>
    )
};

{/* <div>
<select className={s.select} name='Creation Order' onChange={ e => handleFilterCreated(e)} defaultValue={'DEFAULT'}>
    <option value='DEFAULT' disabled>API or DB</option>
    <option value='created'>From Database</option>
    <option value='api'>From RAWG API</option>
</select>

<select className={s.select} name="Genre Filter" onChange={handleFilterGenre} defaultValue={'DEFAULT'}>
    <option value='DEFAULT' disabled>Genre</option>
    {genres.map((g) =>(
    <option key={g.id} value={g.name}>{g.name}</option>
    ))}
</select>
</div> */}