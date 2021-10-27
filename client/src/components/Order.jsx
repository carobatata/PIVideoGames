import { useDispatch } from 'react-redux';
import { sort } from '../actions/index.js';

export default function Order() {
    
    const dispatch = useDispatch();

    function handleSelectChange(e) {
        dispatch(sort(e.target.value))
    }
    
    return(
        <select name="Alphabetical Order" onChange={handleSelectChange}>
            <option value='ascendente'>A-Z</option>
            <option value='descendente'>Z-A</option>
        </select>
    )
}

