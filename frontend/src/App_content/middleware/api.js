import { 
    ADD_NEW_ENROLLED, 
    UPDATE_USER_DATA,
    SET_CURRENT_AGENT, 
    RATE_AGENT,
    RECEIVE_RATINGS,
    LOAD_ENROLLED,
    SET_ENROLL_STATUS,
    HANDLE_ENROLL } from '../ducks/data';
import { INIT_UI, CHANGE_MODAL, SHOW_ALL_RATINGS, CHANGE_LOADER, CHANGE_OPTION } from '../ducks/ui';
import { 
    getAllEnrolled, 
    getUsersData, 
    //getAgentsAverage, 
    rateAgent, 
    getAgentsRating,
    enrollUser } from '../hc_api/hc_api';

const apiMiddleware = ( {dispatch, getState} ) => next => action => {
    switch (action.type) {
        case INIT_UI:
            // Show loader spinner
            dispatch({
                type: CHANGE_LOADER, 
                payload: true
            });

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

        case LOAD_ENROLLED:
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

        case CHANGE_OPTION:
            // Get current user's data
            getUsersData(action.payload)
                // on receive emit UPDATE_USER_DATA
                .then(r => {
                    if (r.success)
                        dispatch({
                            type: SET_CURRENT_AGENT, 
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

            // Termitate action here
            return ;

        case HANDLE_ENROLL:
            // Get current user's data
            enrollUser(action.payload)
                .then(r => {
                    if (r.success)
                        dispatch({
                            type: SET_ENROLL_STATUS, 
                            payload: true
                        });
                    else
                        dispatch({
                            type: SET_ENROLL_STATUS, 
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

            // Termitate action here
            return ;

        case RATE_AGENT:
            // Make API Call first
            rateAgent({
                Ratee: getState().data.currentAgent.hash,
                Value: action.payload.sliderValues
            })
                .then(obj => {
                    // If successful then cheer it up
                    if (obj.success) {
                        // Show success modal
                        dispatch({type: CHANGE_MODAL, payload: {
                            isShowing: true,
                            error: false,
                            text: 'Thanks for rating ' + getState().data.currentAgent.name
                        }});
                        // TODO: Merge state.data.currentAgent.currentAgent with obj.response.newValues
                        // with help of UPDATE_USER_DATA
                    } else {
                        dispatch({type: CHANGE_MODAL, payload: {
                            isShowing: true,
                            error: true,
                            text: 'Oops, you have already rated ' + getState().data.currentAgent.name
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