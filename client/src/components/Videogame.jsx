import { Link } from 'react-router-dom';
import s from  './Videogame.module.css';


export default function Videogame({id, image, name, genres, rating}) {
    return(
        <div className={s.flexContainer}>
                <span>{name}</span>
                <div>
                    <img className={s.image} src={image} alt="VideogameImage" />
                </div>
                <div>
                    {genres.map(genre => <span key={genre} >{genre}</span>)}
                </div>
                <div>{rating}</div> 
                 <Link to={`/${id}`}>Click for more details</Link>
            </div>
    )
}