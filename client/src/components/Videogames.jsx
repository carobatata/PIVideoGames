import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../actions/index.js';
import Videogame from './Videogame';
import Paginado from './Paginado.jsx';

export default function Videogames() {

    let videogames = useSelector((state) => state.filteredVideogames); //lo mismo que hacer el mapState

    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getVideogames()) //map dispatch to Props
    }, [])

    const [currentPage, setCurrentPage] = useState(1); //useState es estado local. empiezo en pagina 1
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
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
        <div>
            <button onClick={e=> {handleClick(e)}}>Reset Videogames</button>

            <Paginado
                videogamesPerPage={videogamesPerPage}
                videogames={videogames.length}
                paginado = {paginado}/>

            {currentVideogames?.map((videogame) => {
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
