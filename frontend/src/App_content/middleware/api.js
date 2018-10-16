import { ADD_NEW_ENROLLED, UPDATE_USER_DATA, GET_USERS_AVERAGE, SET_CURRENT_AGENT, RATE_AGENT } from '../ducks/data';
import { INIT_UI, GO_TO_HOME, CHANGE_MODAL } from '../ducks/ui';
import { getAllEnrolled, getUsersData, getAgentsAverage, rateAgent } from '../hc_api/hc_api';

const apiMiddleware = ( {dispatch, getState} ) => next => action => {
    switch (action.type) {
        case INIT_UI:
            // Get all users enrolled in this app
            getAllEnrolled()
                // on receive emit ADD_NEW_ENROLLED 
                .then(r => {
                    var data = [];
                    for (var i = 0; i < r.length; ++i){
                        var d = {Name: r[i].Entry.Identity , Hash: r[i].Hash, Rating: r[i].rating}
                        data.push(d);
                    }
                    dispatch({
                        type: ADD_NEW_ENROLLED, 
                        payload: data
                    })
                })
                // Catch any errors 
                .catch(e => {
                    dispatch({type: CHANGE_MODAL, payload: {
                        isShowing: true,
                        error: true,
                        text: "Can't connect to the server"
                    }});
                    console.log(e);
                });

            // Get current user's data
            getUsersData()
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
            getAgentsAverage({Hash: action.payload})
                // on receive emit SET_CURRENT_AGENT 
                .then(obj => {
                    if (obj.AverageRating !== undefined) {
                        dispatch({
                            type: SET_CURRENT_AGENT, 
                            payload: {
                                Rating: obj.AverageRating
                            }
                        });
                    }
                })
                // Catch any errors 
                .catch(e => console.log(e));   

            // Termitate action here
            return ;
        
        case RATE_AGENT:
                // Make API Call first
                rateAgent({
                    Ratee: getState().data.currentAgent.Hash,
                    Value: getState().ui.sliderValue
                })
                    .then(obj => {
                        // If successful then cheer it up
                        if (obj.Success) {
                            dispatch({type: CHANGE_MODAL, payload: {
                                isShowing: true,
                                error: false,
                                text: 'Thanks for rating ' + getState().data.currentAgent.Name
                            }});
                        } else {
                            dispatch({type: CHANGE_MODAL, payload: {
                                isShowing: true,
                                error: false,
                                text: 'Oops, you have already rated ' + getState().data.currentAgent.Name
                            }});
                        }
                        dispatch({type: GO_TO_HOME});
                    })
                    // Catch any errors 
                    .catch(e => console.log(e));
            return next(action); // Pass event to data reducer

        default:
            return next(action);
    }
}

export default apiMiddleware;