import { ADD_NEW_ENROLLED, UPDATE_USER_DATA, GET_USERS_AVERAGE } from '../ducks/data';
import { INIT_UI, SET_CURRENT_USER } from '../ducks/ui';
import { getAllEnrolled, getCurrentUsersData } from '../hc_api/hc_api';

const apiMiddleware = ( {dispatch} ) => next => action => {
    switch (action.type) {
        case INIT_UI:
            // Get all users enrolled in this app
            getAllEnrolled()
                // on receive emit ADD_NEW_ENROLLED 
                .then(r => {
                    dispatch({
                        type: ADD_NEW_ENROLLED, 
                        payload: r
                    })
                })
                // Catch any errors 
                .catch(e => console.log(e));

            // Get current user's data
            getCurrentUsersData()
                // on receive emit UPDATE_USER_DATA
                .then(r => {
                    dispatch({
                        type: UPDATE_USER_DATA, 
                        payload: r
                    })
                })
                // Catch any errors 
                .catch(e => console.log(e));

            // Pass event further down the chain in case you needed to update UI or something
            return next(action);

        case GET_USERS_AVERAGE:
            // Get user's average
            getAllEnrolled()
                // on receive emit SET_CURRENT_USER 
                .then(value => {
                    let name = "John"; // TODO Get users name from enrolments based on hash provided
                    dispatch({
                        type: SET_CURRENT_USER, 
                        payload: {name, value}
                    })
                })
                // Catch any errors 
                .catch(e => console.log(e));   

            // Termitate action here
            return ;

        default:
            return next(action);
    }
}

export default apiMiddleware;