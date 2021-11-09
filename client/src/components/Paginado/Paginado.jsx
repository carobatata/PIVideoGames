import s from  './Paginado.module.css';

export default function Paginado({videogamesPerPage, videogames, paginado}) {
    const pageNumbers = [];
    for(var i=1; i <= Math.ceil(videogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

        return(
            <nav>
                <ul className={s.pages}>
                    {pageNumbers.length > 1 && pageNumbers.map(number => (
                        <li key={number}>
                            <button className={s.pagina} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        )
}