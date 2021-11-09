import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterGenre, getGenres, filterCreated, alphabeticalSort, ratingSort } from '../../actions/index.js';
import Videogame from '../Videogame/Videogame';
import Paginado from '../Paginado/Paginado.jsx';
import s from  './Videogames.module.css';

export default function Videogames() {

    const nameOrder = useSelector((state) => state.nameOrder)
    const creationFilter = useSelector((state) => state.creationFilter)
    const genreFilter = useSelector((state) => state.genreFilter)

    let videogames = useSelector((state) => state.filteredVideogames); 
    // videogames.splice(1)

    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1); //useState es estado local. empiezo en pagina 1
    const [videogamesPerPage] = useState(15);
    const indexLastVideogame = currentPage * videogamesPerPage;
    const indexFirstVideogame = indexLastVideogame - videogamesPerPage;
    const currentVideogames = videogames.slice(indexFirstVideogame, indexLastVideogame);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    } 

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    };

    const genres = useSelector((state) => state.genres)

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
        } else {
            dispatch(ratingSort(e.target.value))

        }
    }

    return (
        <div className={s.container}>

            <div className={s.orderFilters}>

                <div>
                    <select className={s.select} name="Order" onChange={handleSelectChange} value={nameOrder}>
                        <option value='default' disabled>Order</option>
                        <option value='ascendente'>A-Z</option>
                        <option value='descendente'>Z-A</option>
                        <option value='asc'>Lowest to Best Rating</option>
                        <option value='desc'>Best to Lowest Rating</option>
                    </select>
                </div>

                <div>
                    <select className={s.select} name="Genre Filter" onChange={handleFilterGenre} value={genreFilter}>
                    <option value='default' disabled>Genre</option>
                        {genres.map((g) =>(
                            <option key={g.id} value={g.name}>{g.name}</option>
                            ))}
                    </select>
                </div>

                <div>
                    <select className={s.select} name='Creation Order' onChange={handleFilterCreated} value={creationFilter}>
                        <option value='default' disabled>Created or Existed</option>
                        <option value='created'>Created by me</option>
                        <option value='api'>Existed</option>
                    </select>
                </div>


            </div>

            <button className={s.button} onClick={e=> {handleClick(e)}}>Reset Videogames</button>

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
                    <h2> Sorry! There is no match for your search. </h2>
                    <img className={s.photo} src="https://preview.redd.it/zqqvyy6rtll61.png?auto=webp&s=c0893407ab92d129cba70a606e9e64b5afe014e7" alt="SadMarioBross" />
                </div>
                } 
            
            <div>
             <Paginado
                videogamesPerPage={videogamesPerPage}
                videogames={videogames.length}
                paginado = {paginado}/>
            </div>


        </div>
    )
}
