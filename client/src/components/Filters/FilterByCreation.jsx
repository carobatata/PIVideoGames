import { useDispatch } from 'react-redux';
import { filterCreated} from '../../actions/index.js';

export default function FilterByCreation() {
    
    const dispatch = useDispatch();

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    };
    
    return(
        <select name='Creation Order' onChange={ e => handleFilterCreated(e)}>
            <option value='created'>Created by Me</option>
            <option value='api'>Already Existed</option>
        </select>
    )
};
