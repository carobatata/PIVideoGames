import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, postVideogame } from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';;
 
 
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
  
   const dispatch = useDispatch();
   const history = useHistory();
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
 
         function handleSelect(e) {
     setVideogame({
       ...videogame,
       genres: [...videogame.genres, e.target.value]
     })
   }
 
   function handleSelectPlatforms(e) {
     // if(e.target.checked) {
       setVideogame({
         ...videogame,
         platforms: [...videogame.platforms, e.target.value]
       })
     // }
   }
   
   function handleSubmit(e) {
       e.preventDefault();
       console.log(videogame)
       setErrors(validate({
         ...videogame,
         [e.target.name]: e.target.value
       }));
       dispatch(postVideogame(videogame))
       alert('Videogame succesfully created')
       // axios.post('http://localhost:3001/videogame', videogame)
       // .then(() => {
       //     alert('Videogame succesfully created')
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
       }
     // function handleDeletePlatform(e) {
     //   setVideogame({
     //     ...videogame,
     //     platforms: videogame.platforms.filter(p => p !== e)
     //   })
     // }
 
     function handleDeleteGenre(e) {
       setVideogame({
         ...videogame,
         genres: videogame.genres.filter(g => g !== e)
       })
     }
 
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
 
 
            {/* <label>Platforms:</label>
            <input
               type='text'
               name='platforms'
               value={videogame.platforms}
               onChange={handleChange} /> */}
 
 
           <select>
             <option value={videogame.platforms}>PlayStation</option>
             <option value={videogame.platforms}>PlayStation</option>
             <option value={videogame.platforms}>PlayStation</option>
           </select>
 
           <select onChange={(e) => handleSelect(e)}>
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
