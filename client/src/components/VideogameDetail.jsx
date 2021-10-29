import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function VideogameDetail() {
    const [videogame, setVideogame] = useState();
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then((response) => {
            setVideogame(response.data)
        })
    })

        if(videogame) {
            return(
                <div>
                    <h3>{videogame.name}</h3>
                    <img src={videogame.image} alt="VideogameImage" />
                    <h5>{videogame.releaseDate}</h5>
                    <p>{videogame.description}</p>
                    <h6>Rating: {videogame.rating}</h6>
                    <p>{videogame.platforms}</p> 
                    <p>{videogame.genres}</p>
                </div>
            )
        } else {
            return <h4>Videogame does not exist</h4>
            }
};