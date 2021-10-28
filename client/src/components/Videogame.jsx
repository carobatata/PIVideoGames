import { Link } from 'react-router-dom';
import s from  './Videogame.module.css';


export default function Videogame({id, image, name, genres}) {
    return(
        <div className={s.flexContainer}>
            <Link to={`/${id}`}>
            <div className={s.flexItem}>
                <h2>{name}</h2>
                <img className={s.image} src={image} alt="VideogameImage" />
                <h4>{genres}</h4>
            </div> 
            </Link>
        </div>
    )
}