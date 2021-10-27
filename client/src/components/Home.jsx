import { Link } from 'react-router-dom';
import Videogames from './Videogames';
import FilterByCreation from './FilterByCreation.jsx';
import Order from './Order'

export default function Home() {

    return (
        <div>
            <Link to='addVideogame'>Create yours</Link>

            <h6>Videogames World</h6>

            <FilterByCreation/>

            <Order/>

            <Videogames/>

        </div>
    )
}
