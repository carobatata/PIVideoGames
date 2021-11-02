import { useEffect, useState } from 'react';
import { getGenres, postVideogame } from '../../actions/index';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import s from  './CreateVideogame.module.css';
 
function validate(input) {
 let errors = {};
 if(!input.name) {
   errors.name = '*Name is required'
  } else if(!input.realeseDate) {
    errors.realeseDate = '*Release date is required'
   } else if(!input.description) {
   errors.description = '*Description is required'
  } else if(!input.rating) {
  errors.rating = '*Rating is required'
  } else if(!input.genres) {
  errors.genres = '*Select at least one genre'
  } else if(!input.platforms) {
  errors.platforms = '*Select at least one platform'
}
 return errors;
};
 
export default function CreateVideogame() {

  const platforms = ["Android", "Linux", "Nintendo 3DS", "Nintendo Switch", "PC", "PS Vita", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Web", "Wii U", "Xbox", "Xbox 360", "Xbox One", "Xbox Series S/X", "iOS", "macOS"];
  
  const genres = useSelector((state) => state.genres)
  
   const dispatch = useDispatch();
   const history = useHistory();
   
 
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
          setVideogame({
            ...videogame,
            platforms: [...videogame.platforms, e.target.value]
          })
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
          
          
          function handleDeleteGenre(genre) {
            setVideogame({
              ...videogame,
              genres: videogame.genres.filter(g => g !== genre)
            })
          }
          
          function handleDeletePlatform(platform) {
            setVideogame({
              ...videogame,
              platforms: videogame.platforms.filter(p => p !== platform)
          })
        }
          
          useEffect(() => {
            dispatch(getGenres());
          }, [dispatch]);
        
          return (
                
          <div className={s.container}>
            <Link to='/home' className={s.link}>
              <button className={s.button} >Home</button>
            </Link>
      
      
            <div className={s.formcontainer}>

            <form className={s.form} onSubmit={handleSubmit}>

                <h2>Create your Videogame</h2>
          
                <div className={s.formSection}>
                  <input
                    className={s.formInput}
                    type='text'
                    name='name'
                    placeholder='Name...'
                    value={videogame.name}
                    onChange={handleChange}
                    />
                    {errors.name && (
                      <p className={s.error}>{errors.name}</p>
                    )}
                </div>


                <div className={s.formSection}>
                  <input
                    className={s.formInput}
                    type='text'
                    name='image'
                    placeholder= 'URL image...'
                    value={videogame.image}
                    onChange={handleChange} />
                </div>

                <div className={s.formSection}>
                  <input
                    className={s.formInput}
                    type='date'
                    name='realeseDate'
                    placeholder= 'Release Date'
                    value={videogame.realeseDate}
                    onChange={handleChange} />
                    {errors.realeseDate && (
                    <p className={s.error}>{errors.realeseDate}</p>
                  )}
                </div>

                <div className={s.formSection}>
                  <textarea
                    className={s.textarea}
                    name= 'description'
                    placeholder= 'Description...'
                    maxLength="200"
                    value= {videogame.description}
                    onChange={handleChange}>
                  </textarea>
                  {errors.description && (
                      <p className={s.error}>{errors.description}</p>
                      )}
                </div>     
    
                <div className={s.formSection}>
                  <input
                    className={s.formInput}
                    type='number'
                    name='rating'
                    min= '1'
                    max='5'
                    placeholder= '1-5'
                    value={videogame.rating}
                    onChange={handleChange}
                    required />
                    {errors.rating && (
                    <p className={s.error}>{errors.rating}</p>
                  )}
                </div>
      
                <div className={s.formSection}>
                  <div className={s.genrePlatforms}>
                    <select className={s.select} onChange={handleSelect} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Choose at least one Genre</option>
                        {genres.map((g) => (
                          <option value={g.name} key={g.id}>{g.name}</option>
                        ))}
                    </select>

                    {errors.genres && (
                      <p className={s.error}>{errors.genres}</p>
                      )}

                      {videogame.genres.map(g =>
                        <div  className={s.choices} key={g}>
                          <p >{g}</p>
                          <input className={s.buttonDelete} type="button" value='x' onClick={()=> handleDeleteGenre(g)} /> 
                        </div>
                        )}
                  </div>
                </div>

                <div className={s.formSection}>
                  <div className={s.genrePlatforms}>
                    <select className={s.select} onChange={handleSelectPlatforms} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Choose at least one Platform</option>
                        {platforms.map((p) => (
                          <option key={p.id} value={p}>{p}</option>
                        ))}
                    </select>
                    {errors.platforms && (
                      <p className={s.error}>{errors.platforms}</p>
                      )}

                    {videogame.platforms.map(p =>
                      <div  className={s.choices} key={p}>
                        <p >{p}</p>
                        <input className={s.buttonDelete} type="button" value='x' onClick={() => handleDeletePlatform(p)} />
                      </div>
                      )}
                  </div>
                </div>
                
                <div className={s.buttonSection}>
                  <input className={s.button2} type="submit" value="CREATE" disabled={!Object.keys(errors).length === 0} />
                </div>
            </form>
            </div>
          </div>
        )
}
            