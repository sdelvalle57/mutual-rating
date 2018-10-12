import { combineReducers } from 'redux';
import dataReducer from './App_content/ducks/data';
import uiReducer from './App_content/ducks/ui';

// Assign reducer to different parts of the application store
// that way they can alter only that part of the store
const rootReducer = combineReducers({
    data : dataReducer,
    ui : uiReducer
});

export default rootReducer;