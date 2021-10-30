import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

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
                <div>
                    <Link to='/home'>
                        <button>Home</button>
                    </Link>
                    <div>
                        <h3>{videogame.name}</h3>
                        <img src={videogame.image} alt="VideogameImage" />
                        <h5>{videogame.releaseDate}</h5>
                        <div dangerouslySetInnerHTML={{__html: videogame.description}}></div>
                        <h6>Rating: {videogame.rating}</h6>
                        <p>{videogame.platforms}</p> 
                        <p>{videogame.genres}</p>
                    </div>
                </div>
            )
        } else {
            return <h4>Videogame does not exist</h4>
            }
};