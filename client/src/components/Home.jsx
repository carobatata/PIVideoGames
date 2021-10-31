import s from  './Home.module.css';
import { Link } from 'react-router-dom';
import Videogames from './Videogames';
import FilterByCreation from './Filters/FilterByCreation.jsx';
import FilterByGenre from './Filters/FilterByGenre';
import RatingOrder from './Orders/RatingOrder';
import AlphabeticalOrder from './Orders/AlphabeticalOrder'

export default function Home() {

    return (
        <div className={s.container}>
            <Link to='createVideogame'>
                <button>CREATE</button>
                </Link>

            <h6>Videogames World</h6>

            <FilterByCreation/>

            <FilterByGenre/>

            <AlphabeticalOrder/>

            <RatingOrder/>

            <Videogames/>

        </div>
    )
}
