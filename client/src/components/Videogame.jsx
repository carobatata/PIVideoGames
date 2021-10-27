import { Link } from 'react-router-dom';

export default function Videogame({id, image, name, genres}) {
    return(
        <div>
            <Link to={`/${id}`}> 
                <h2>{name}</h2>
                <img src={image} alt="VideogameImage" />
                <h4>{genres}</h4>
            </Link>
        </div>
    )
}