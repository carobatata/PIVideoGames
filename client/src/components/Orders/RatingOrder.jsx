import { useDispatch } from 'react-redux';
import { ratingSort } from '../../actions/index.js';

export default function RatingOrder() {
    
    const dispatch = useDispatch();

    function handleSelectChange(e) {
        dispatch(ratingSort(e.target.value))
    }
    
    return(
        <select name='Rating Order' onChange={handleSelectChange}>
            <option value='asc'>Lowest to Best Ranking</option>
            <option value='desc'>Best to Lowest Ranking</option>
        </select>
    )
};