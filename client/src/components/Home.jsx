import { Link } from 'react-router-dom';
import Videogames from './Videogames';
import FilterByCreation from './Filters/FilterByCreation.jsx';
import FilterByGenre from './Filters/FilterByGenre';
import RatingOrder from './Orders/RatingOrder';
import AlphabeticalOrder from './Orders/AlphabeticalOrder'
import SearchBar from './SearchBar';
import s from  './Home.module.css';

export default function Home() {
    return (
        <div className={s.container}>
           <div className={s.navbar}>
                <span className={s.title}> Land of Videogames</span>
                <SearchBar />
                <Link to='createVideogame'>
                    <button className={s.button}>CREATE</button>
                    </Link>
           </div>
           <div className={s.filterorder}>
                <AlphabeticalOrder/>
                <RatingOrder/>
                <FilterByGenre/>
                <FilterByCreation/>
           </div>

            <Videogames/>

        </div>
    )
}
