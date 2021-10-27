import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage () {
    return(
         <div>
            <h6>Welcome to the World of all Videogames</h6>
            <Link to = '/home'>
                <button>Start</button>
            </Link>
         </div>
    )
}
