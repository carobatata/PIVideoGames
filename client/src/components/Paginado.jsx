import React from "react";

export default function Paginado({videogamesPerPage, videogames, paginado}) {
    const pageNumbers = [];
    for(var i=1; i <= Math.ceil(videogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul>
                {pageNumbers.map(number => (
                    <li>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}