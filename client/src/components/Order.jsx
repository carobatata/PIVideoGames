import { useDispatch } from 'react-redux';
import { sort } from '../actions/index.js';
import { ASCENDENTE, DESCENDENTE } from '../constants/sort.js';

export default function Order() {
    
    const dispatch = useDispatch();

    function onSelectChange(e) {
        dispatch(sort(e.target.value))
    }
    
    return(
        <select name="Alphabetical Order" onChange={onSelectChange}>
            <option value={ASCENDENTE}>A-Z</option>
            <option value={DESCENDENTE}>Z-A</option>
        </select>
    )
}