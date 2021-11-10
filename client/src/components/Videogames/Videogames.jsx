import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres } from '../../actions/index.js';
import Videogame from '../Videogame/Videogame';
import Pagination from '../Pagination/Pagination.jsx';
import s from  './Videogames.module.css';
import FiltersAndOrders from '../FiltersAndOrders/FiltersAndOrders.jsx';

export default function Videogames() {

    let videogames = useSelector((state) => state.filteredVideogames); 
    // videogames.splice(1)

    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1); 
    const [videogamesPerPage] = useState(15);
    const indexLastVideogame = currentPage * videogamesPerPage;
    const indexFirstVideogame = indexLastVideogame - videogamesPerPage;
    const currentVideogames = videogames.slice(indexFirstVideogame, indexLastVideogame);
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    } 

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setCurrentPage(1);
    }

    useEffect(() => {
        dispatch(getGenres());
      }, [dispatch]);
    
 
    return (
        <div className={s.container}>

            <FiltersAndOrders setCurrentPage={setCurrentPage} className={s.orderFilter}/>

            <button className={s.button} onClick={e=> {handleClick(e)}}>Reset Videogames</button>

            <div>
                <Pagination
                    videogamesPerPage={videogamesPerPage}
                    videogames={videogames.length}
                    paginate = {paginate}/>
            </div>

            {currentVideogames.length > 0 ? 
            <div className={s.flexItem}> 
                {currentVideogames.map((videogame) => {
                    return <Videogame 
                        id={videogame.id}
                        image={videogame.image} 
                        name={videogame.name}
                        genres={videogame.genres}
                        rating={videogame.rating}
                        key={videogame.id}
                    />
                })}     
            </div>   
            : 
            <div className={s.novideogame}>
                <h2>LOADING...</h2>
                <h4> If persists more than 15 seconds: </h4>
                <h4> Sorry! There is no match for your search. </h4>
                <img className={s.photo} src="https://preview.redd.it/zqqvyy6rtll61.png?auto=webp&s=c0893407ab92d129cba70a606e9e64b5afe014e7" alt="SadMarioBross" />
            </div>
            } 
            
            <div>
             <Pagination
                videogamesPerPage={videogamesPerPage}
                videogames={videogames.length}
                paginate = {paginate}/>
            </div>

        </div>
    )
}


// <div className={s.orderFilters}>

// <div>
//     <select className={s.select} name="Order" onChange={handleSelectChange} value={nameOrder}>
//         <option value='default' disabled>Order</option>
//         <option value='ascendente'>A-Z</option>
//         <option value='descendente'>Z-A</option>
//         <option value='asc'>Lowest to Best Rating</option>
//         <option value='desc'>Best to Lowest Rating</option>
//     </select>
// </div>

// <div>
//     <select className={s.select} name="Genre Filter" onChange={handleFilterGenre} value={genreFilter}>
//     <option value='default' disabled>Genre</option>
//         {genres.map((g) =>(
//             <option key={g.id} value={g.name}>{g.name}</option>
//             ))}
//     </select>
// </div>

// <div>
//     <select className={s.select} name='Creation Order' onChange={handleFilterCreated} value={creationFilter}>
//         <option value='default' disabled>Created or Existed</option>
//         <option value='created'>Created by me</option>
//         <option value='api'>Existed</option>
//     </select>
// </div>