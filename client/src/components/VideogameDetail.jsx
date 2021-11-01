import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import s from  './VideogameDetail.module.css';


export default function VideogameDetail() {
    const [videogame, setVideogame] = useState();
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then((response) => {
            const { description } = response.data;
            // const parser = new DOMParser();
            // const htmlDoc = parser.parseFromString(description, 'text/html');
            setVideogame(response.data)
        })
    }, [])
    
    if(videogame) {
            return(
                <div className={s.container}>
                    <Link to='/home'>
                        <button className={s.button}>Home</button>
                    </Link>
                    <div>
                        <h1 className={s.title}>{videogame.name}</h1>
                        <img className={s.image} src={videogame.image} alt="VideogameImage" />
                        <div>
                            <span className={s.bold}>Release Date: </span>
                            <span>{videogame.releaseDate}</span>
                        </div>

                        <div className={s.genres}>
                        {videogame.genres.map(genre => <span className={s.genre} key={genre} >{genre}</span>)}
                       </div>

                        <div>
                            <span className={s.bold}>Rating: </span>
                            <span>{videogame.rating}</span>
                        </div>


                        <div className={s.description} dangerouslySetInnerHTML={{__html: videogame.description}}></div>

                       <div className={s.platforms}>
                        {videogame.platforms.map(platform => <span className={s.platform} key={platform} >{platform}</span>)}
                       </div>


                    </div>
                </div>
            )
        } else {
            return <h4>Videogame does not exist</h4>
            }
};