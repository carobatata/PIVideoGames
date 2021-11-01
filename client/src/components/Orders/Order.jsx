import { useDispatch } from 'react-redux';
import { alphabeticalSort, ratingSort } from '../../actions/index.js';
import s from  './Order.module.css';

export default function AlphabeticalOrder() {
    
    const dispatch = useDispatch();

    function handleSelectChange(e) {
        if(e.target.value === 'ascendente' || e.target.value=== 'descendente'){
            dispatch(alphabeticalSort(e.target.value))
        } else {
            dispatch(ratingSort(e.target.value))
        }
    }
    
    return(
        <select className={s.select} name="Alphabetical Order" onChange={handleSelectChange}>
            <option value="none" selected disabled hidden>Order</option>
            <option value='ascendente'>A-Z</option>
            <option value='descendente'>Z-A</option>
            <option value='asc'>Lowest to Best Rating</option>
            <option value='desc'>Best to Lowest Rating</option>
        </select>
    )
}

