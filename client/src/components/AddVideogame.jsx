import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getGenres } from '../actions/index';
import { Link } from 'react-router-dom';


function validate(input) {
  let errors = {};
  if(!input.name) {
    errors.name = 'Name is required'
  } else if(!input.description) {
    errors.description = 'Description is required'
  } else if(!input.platforms) {
    errors.description = 'Platforms are required'
  }
  return errors;
};

export default function AddVideogame() {
    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres)

    const [videogame, setVideogame] = useState({
      name: '',
      image: '',
      description: '',
      realeseDate: '',
      date: '',
      platforms: [],
      genres: []
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        e.preventDefault();
        setVideogame({
          ...videogame,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
          ...videogame,
          [e.target.name]: e.target.value
        }))
        console.log(videogame)
      }

    function handleCheck(e) {
      if(e.target.checked) {
        setVideogame({
          ...videogame,
          platforms: [...videogame.platforms, e.target.value]
        })
      }
    }

    function handleSelect(e) {
      setVideogame({
        ...videogame,
        genres: [...videogame.genres, e.target.value]
      })
    }

    
    function handleSubmit(e) {
        e.preventDefault();
        console.log(videogame)
        setErrors(validate({
          ...videogame,
          [e.target.name]: e.target.value
        }));
        axios.post('http://localhost:3001/videogame', videogame)
        .then(() => {
            alert('Videogame succesfully created')
            setVideogame({
              name: '',
              image: '',
              description: '',
              realeseDate: '',
              rating:'',
              date: '',
              platforms: [],
              genres: []
            })
            history.push('/home')
        })
      }
      function handleDeletePlatform(e) {
        setVideogame({
          ...videogame,
          platforms: videogame.platforms.filter(p => p !== e)
        })
      }
      function handleDeleteGenre(e) {
        setVideogame({
          ...videogame,
          genres: videogame.genres.filter(g => g !== e)
        })
      }

      // function onClose(id) {
      //   setCities(oldCities => oldCities.filter(c => c.id !== id));
      // }

      useEffect(() => {
        dispatch(getGenres());
      }, []);
    
    return (

      <div>
        <Link to='/home'>
          <button>Home</button>
        </Link>

        <h5>Create your Videogame</h5>


        <form onSubmit={handleSubmit}>

            <label>Name:</label>
            <input 
              type='text'
              name='name'
              value={videogame.name}
              onChange={handleChange} 
              />
              {errors.name && (
                <p>{errors.name}</p>
              )}

            <label>Description:</label>

            <textarea 
              name= 'description' 
              value= {videogame.description}
              onChange={handleChange}>
            </textarea>

              {errors.description && (
                <p>{errors.description}</p>
              )}

              <label>Image(URL):</label>
              <input 
                type='text'
                name='image'
                value={videogame.image}
                onChange={handleChange} />
           
              <label>Release Date:</label>
              <input 
                type='date'
                name='releaseDate'
                value={videogame.releaseDate}
                onChange={handleChange} />

              <label>Rating:</label>
              <input 
                type='number'
                name='rating'
                value={videogame.rating}
                onChange={handleChange} />


             <label>Platforms:</label>
             <input 
                type='text'
                name='platforms'
                value={videogame.platforms}
                onChange={handleChange} />

            <select onChange={handleSelect}>
              {genres.map((g) =>(
                <option value={g.name}>{g.name}</option>
              ))}
            </select>
            <button>Add Videogame</button>
        </form>
        {videogame.genres.map(g => 
          <div>
            <p>{g}</p>
            <button onClick={() => handleDeleteGenre(g)}>x</button>   
          </div>
          )}
      </div>
    )
    
}

//Rating agregar.
// [ ] Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas
// [ ] Botón/Opción para crear un nuevo videojuego