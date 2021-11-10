import { Link } from 'react-router-dom';
import Videogames from '../Videogames/Videogames';
import SearchBar from '../SearchBar/SearchBar';
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
            <Videogames/>
        </div>
    )
}
