import { useDispatch } from 'react-redux';
import { ratingSort } from '../../actions/index.js';
import s from  './RatingOrder.module.css';

export default function RatingOrder() {
    
    const dispatch = useDispatch();

    function handleSelectChange(e) {
        dispatch(ratingSort(e.target.value))
    }
    
    return(
        <select className={s.select} name='Rating Order' onChange={handleSelectChange}>
            <option value='asc'>Lowest to Best Rating</option>
            <option value='desc'>Best to Lowest Rating</option>
        </select>
    )
};