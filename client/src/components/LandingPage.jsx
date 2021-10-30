import React from 'react';
import { Link } from 'react-router-dom';
import s from  './LandingPage.module.css';


export default function LandingPage () {
    return(
         <div className={s.landing}>
            <h6>Discover everything about VIDEOGAMES!</h6>
            <Link to = '/home'>
                <button>Home</button>
            </Link>
         </div>
    )
}
