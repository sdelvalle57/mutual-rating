import { SWITCH_VIEW } from '../ducks/ui';
import { SELECT_USER } from '../ducks/data';

const dataMiddleware = ( { dispatch, getState } ) => next => action => {
    // See if numClicks is already 0 and emit warning
    if (action.type === SELECT_USER) {
        dispatch({type: SWITCH_VIEW, payload: 'rated'});
        return next(action); // Pass event to data reducer
    }
    return next(action);
}

export default dataMiddleware;