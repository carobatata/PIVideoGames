import s from  './Paginado.module.css';

export default function Paginado({videogamesPerPage, videogames, paginado}) {
    const pageNumbers = [];
    for(var i=1; i <= Math.ceil(videogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className={s.pages}>
                {pageNumbers.map(number => (
                    <li className={s.pagina}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}