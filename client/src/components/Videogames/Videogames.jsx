import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../actions/index.js';
import Videogame from '../Videogame/Videogame';
import Paginado from '../Paginado/Paginado.jsx';
import s from  './Videogames.module.css';

export default function Videogames() {

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
    }

    return (
        <div className={s.container}>
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
