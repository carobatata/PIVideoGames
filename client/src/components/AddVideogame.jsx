import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function AddVideogame() {
    const [videogame, setVideogame] = useState({});
    let history = useHistory();

    function handleChange(e) {
        e.preventDefault();
        setVideogame({
          ...videogame,
          [e.target.name]: e.target.value
        });
      }
    
    function handleSubmit(e) {
        console.log(videogame)
        e.preventDefault();
        axios.post('http://localhost:3001/videogame', videogame)
        .then(() => {
            history.push('/')
        })
      }
    
    return (
        <form onSubmit={handleSubmit}>

            <label>Name:</label>
            <input 
                type='text'
                name='name'
                value={videogame.name}
                onChange={handleChange} />

            <label>Description:</label>

            <textarea 
              name= 'description' 
              value= {videogame.description}
              onChange={handleChange}>
            </textarea>

            <label>Release Date:</label>
            <input 
                type='date'
                name='releaseDate'
                value={videogame.releaseDate}
                onChange={handleChange} />

            <label>Platforms:</label>
            <input 
                type='text'
                name='platforms'
                value={videogame.platforms}
                onChange={handleChange} />

            <button>Add Videogame</button>
        </form>
    )
    
}

//Rating agregar.
// [ ] Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas
// [ ] Botón/Opción para crear un nuevo videojuego