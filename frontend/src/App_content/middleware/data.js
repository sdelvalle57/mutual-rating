import { SWITCH_VIEW, GO_TO_RATING, GO_TO_HOME } from '../ducks/ui';
import { GET_USERS_AVERAGE, SET_CURRENT_AGENT} from '../ducks/data';

const dataMiddleware = ( { dispatch, getState } ) => next => action => {
    // 
    if (action.type === GO_TO_RATING) {
        // Find agent by hash in state.data.enrolled
        let obj = getState().data.enrolled.filter((i) => { return i.Hash === action.payload });

        // Check if anything found
        if (obj && obj[0] && obj[0].Name)
            obj = obj[0]
        else 
            return;

        if (obj.Rating === undefined) dispatch({type: GET_USERS_AVERAGE, payload: action.payload});
        dispatch({type: SET_CURRENT_AGENT, payload: obj});
        dispatch({type: SWITCH_VIEW, payload: 'rated'});
        return next(action); // Pass event to data reducer
    } else if (action.type === GO_TO_HOME) {
        dispatch({type: SET_CURRENT_AGENT, payload: getState().data.user});
        dispatch({type: SWITCH_VIEW, payload: 'home'});
        return next(action); // Pass event to data reducer
    }

    return next(action);
}

export default dataMiddleware;