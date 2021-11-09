import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import s from  './VideogameDetail.module.css';
import { getDetail } from '../../actions/index.js';


export default function VideogameDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
        }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    const videogame = useSelector((state) => state.detail)

    if(videogame) {
            return(          
                <div className={s.container}>
                <div className={s.navbar}>
                     <span className={s.title1}> Land of Videogames</span>
                     <Link to='/home' className={s.link}>
                        <button className={s.button}>Home</button>
                    </Link>
                </div>

                        <h1 className={s.title}>{videogame.name}</h1>

                        <div className={s.genres}>
                        {videogame.genres?.map(genre => <span className={s.genre} key={genre} >{genre}</span>)}
                       </div>
                       
                        <img className={s.image} src={videogame.image} alt="VideogameImage" />
                        <div>
                            <span className={s.bold}>Release Date: </span>
                            <span>{videogame.releaseDate}</span>
                        </div>

                        <div>
                            <span className={s.bold}>Rating: </span>
                            <span>{videogame.rating}</span>
                        </div>


                        <div className={s.description} dangerouslySetInnerHTML={{__html: videogame.description}}></div>

                       <div className={s.platforms}>
                        {videogame.platforms?.map(platform => <span className={s.platform} key={platform} >{platform}</span>)}
                       </div>
                </div>
            )
        } else {
            return <h4>Loading...</h4>
            }
};


// export default function VideogameDetail() {
//     const [videogame, setVideogame] = useState();
//     let { id } = useParams();

//     useEffect(() => {
//         axios.get(`http://localhost:3001/videogame/${id}`)
//         .then((response) => {
//             setVideogame(response.data)
//         })
//     }, []) // eslint-disable-line react-hooks/exhaustive-deps

//     if(videogame) {
//             return(          
//                 <div className={s.container}>
//                 <div className={s.navbar}>
//                      <span className={s.title1}> Land of Videogames</span>
//                      <Link to='/home' className={s.link}>
//                         <button className={s.button}>Home</button>
//                     </Link>
//                 </div>

//                         <h1 className={s.title}>{videogame.name}</h1>

//                         <div className={s.genres}>
//                         {videogame.genres.map(genre => <span className={s.genre} key={genre} >{genre}</span>)}
//                        </div>
                       
//                         <img className={s.image} src={videogame.image} alt="VideogameImage" />
//                         <div>
//                             <span className={s.bold}>Release Date: </span>
//                             <span>{videogame.releaseDate}</span>
//                         </div>

//                         <div>
//                             <span className={s.bold}>Rating: </span>
//                             <span>{videogame.rating}</span>
//                         </div>


//                         <div className={s.description} dangerouslySetInnerHTML={{__html: videogame.description}}></div>

//                        <div className={s.platforms}>
//                         {videogame.platforms.map(platform => <span className={s.platform} key={platform} >{platform}</span>)}
//                        </div>
//                 </div>
//             )
//         } else {
//             return <h4>Loading...</h4>
//             }
// };