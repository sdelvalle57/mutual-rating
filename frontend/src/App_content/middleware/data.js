import { SWITCH_VIEW, RATE_USER } from '../ducks/ui';
import { GET_USERS_AVERAGE } from '../ducks/data';

const dataMiddleware = ( { dispatch, getState } ) => next => action => {
    // 
    if (action.type === RATE_USER) {
        dispatch({type: SWITCH_VIEW, payload: 'rated'});
        dispatch(...action, {type: GET_USERS_AVERAGE});
        return next(action); // Pass event to data reducer
    }
    return next(action);
}

export default dataMiddleware;