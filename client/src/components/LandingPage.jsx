import React from 'react';
import { Link } from 'react-router-dom';
import s from  './LandingPage.module.css';


export default function LandingPage () {
    return(
         <div className={s.landing}>
            <h6>Welcome to the World of all Videogames</h6>
            <Link to = '/home'>
                <button>Start</button>
            </Link>
         </div>
    )
}
