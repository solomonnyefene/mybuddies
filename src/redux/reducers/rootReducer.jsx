import Reducers from './reducers';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    main: Reducers
});

export default reducers;