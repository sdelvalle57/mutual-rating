import { 
    ADD_NEW_ENROLLED, 
    UPDATE_USER_DATA, 
    GET_USERS_AVERAGE, 
    SET_CURRENT_AGENT, 
    RATE_AGENT,
    RECEIVE_RATINGS } from '../ducks/data';
import { INIT_UI, GO_TO_HOME, CHANGE_MODAL, SHOW_ALL_RATINGS, CHANGE_LOADER } from '../ducks/ui';
import { 
    getAllEnrolled, 
    getUsersData, 
    getAgentsAverage, 
    rateAgent, 
    getAgentsRating } from '../hc_api/hc_api';

const apiMiddleware = ( {dispatch, getState} ) => next => action => {
    switch (action.type) {
        case INIT_UI:
            // Show loader spinner
            dispatch({
                type: CHANGE_LOADER, 
                payload: true
            });
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
                .catch(e => console.log(e));

            // Get current user's data
            getUsersData()
                // on receive emit UPDATE_USER_DATA
                .then(r => {
                    if (r.success)
                        dispatch({
                            type: UPDATE_USER_DATA, 
                            payload: r.user
                        });
                    // Let UI know loading's finished
                    dispatch({
                        type: CHANGE_LOADER, 
                        payload: false
                    });
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

            // Pass event further down the chain in case you needed to update UI or something
            return next(action);

        case GET_USERS_AVERAGE:
            // Get user's average
            getAgentsAverage({Ratee: action.payload})
                // on receive emit SET_CURRENT_AGENT 
                .then(obj => {
                    if (obj.AverageRating !== undefined) {
                        dispatch({
                            type: SET_CURRENT_AGENT, 
                            payload: {
                                Rating: obj.AverageRating,
                                receivedReviews: []
                            }
                        });
                    }
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
                            dispatch({type: GO_TO_HOME});
                        } else {
                            dispatch({type: CHANGE_MODAL, payload: {
                                isShowing: true,
                                error: true,
                                text: 'Oops, you have already rated ' + getState().data.currentAgent.Name
                            }});
                        }
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

            return next(action); // Pass event to data reducer

        case SHOW_ALL_RATINGS:
            // Make API Call first
            getAgentsRating({
                Ratee: getState().data.currentAgent.Hash
            })
                .then(obj => {
                    // If successful then cheer it up
                    if (obj.Success) {
                        if (obj.Entries && obj.Entries.length)
                            dispatch({type: RECEIVE_RATINGS, payload: obj.Entries})
                        else 
                            dispatch({type: CHANGE_MODAL, payload: {
                                isShowing: true,
                                error: false,
                                text: "Couldn't find any ratings for " + getState().data.currentAgent.Name
                            }});

                    } else {
                        dispatch({type: CHANGE_MODAL, payload: {
                            isShowing: true,
                            error: true,
                            text: "Connection error, try again."
                        }});
                    }
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

            return next(action); // Pass event to data reducer

        default:
            return next(action);
    }
}

export default apiMiddleware;