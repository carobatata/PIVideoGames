import s from  './Pagination.module.css';

export default function Pagination({videogamesPerPage, videogames, paginate}) {
    const pageNumbers = [];
    for(var i=1; i <= Math.ceil(videogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }
        return(
            <nav>
                <ul className={s.pages}>
                    {pageNumbers.length > 1 && pageNumbers.map(number => (
                        <li key={number}>
                            <button className={s.pagina} onClick={() => paginate(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        )
}