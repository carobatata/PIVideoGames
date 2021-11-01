import { Link } from 'react-router-dom';
import s from  './Videogame.module.css';


export default function Videogame({id, image, name, genres, rating}) {
    return(
        <div className={s.flexcontainer}>
                <span className={s.title}>{name}</span>
                <div>
                    <img className={s.image} src={image} alt="VideogameImage" />
                </div>
                <div className={s.genres}>
                    {genres.map(genre => <span key={genre} >{genre}</span>)}
                </div>
                <span className={s.rating}>{rating}</span>
                <div className={s.divlink}>
                    <Link className={s.link} to={`/${id}`}>More details</Link>
                </div>
            </div>
    )
}