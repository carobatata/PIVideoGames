import s from  './Home.module.css';
import { Link } from 'react-router-dom';
import Videogames from './Videogames';
import FilterByCreation from './FilterByCreation.jsx';
import FilterByGenre from './FilterByGenres';
import Order from './Order'

export default function Home() {

    return (
        <div className={s.container}>
            <Link to='addVideogame'>Create yours</Link>

            <h6>Videogames World</h6>

            <FilterByCreation/>

            <FilterByGenre/>

            <Order/>

            <Videogames/>

        </div>
    )
}
