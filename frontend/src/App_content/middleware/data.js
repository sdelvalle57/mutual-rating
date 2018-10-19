import { GO_TO_RATING, GO_TO_HOME, GO_TO_USER, CHANGE_MODAL } from '../ducks/ui';
import { SET_CURRENT_AGENT, LOAD_ENROLLED} from '../ducks/data';

const dataMiddleware = ( { dispatch, getState } ) => next => action => {
    // 
    if (action.type === GO_TO_RATING) {
        // First check it anything selected:
        if (getState().data && getState().data.currentAgent && getState().data.currentAgent.hash) {
            // Download all the ratings from user for currentAgent

        } else {
            dispatch({type: CHANGE_MODAL, payload: {
                isShowing: true,
                error: true,
                text: "Please select user to rate"
            }});
        }
        

        /*if (obj.Rating === undefined) dispatch({type: GET_USERS_AVERAGE, payload: action.payload});
        dispatch({type: SET_CURRENT_AGENT, payload: obj});*/
        return next(action); // Pass event to data reducer
    } else if (action.type === GO_TO_HOME) {
        dispatch({type: SET_CURRENT_AGENT, payload: getState().data.user});
        return next(action); // Pass event to data reducer
    } else if (action.type === GO_TO_USER) {
        // Empty currentAgent
        dispatch({type: SET_CURRENT_AGENT, payload: {
            hash: null,
            name: null,
            overallRating: null,
            categoryRatings: []
        }});
        // Load all enrolled
        dispatch({type: LOAD_ENROLLED});
        return; // Terminate event here
    }

    return next(action);
}

export default dataMiddleware;