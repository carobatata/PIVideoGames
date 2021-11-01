import { useDispatch } from 'react-redux';
import { filterCreated} from '../../actions/index.js';
import s from  './FilterByCreation.module.css';

export default function FilterByCreation() {
    
    const dispatch = useDispatch();

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    };
    
    return(
        <select className={s.select} name='Creation Order' onChange={ e => handleFilterCreated(e)}>
            <option value='all'>All</option>
            <option value='created'>Created by Me</option>
            <option value='api'>Already Existed</option>
        </select>
    )
};
