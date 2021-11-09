import React from 'react';
import { Link } from 'react-router-dom';
import s from  './LandingPage.module.css';


export default function LandingPage () {
    return(
         <div className={s.landing}>
            <div className={s.button_container}> 
                <Link to = '/home'>
                    <button className={s.button}>Take me to the Land of Videogames!</button>
                </Link>
            </div>
         </div>
    )
}
