// That's where all the Types definitions and their reducers live

// Types
export const INIT_UI = '[UI] Init UI';
export const UI_WARNING = '[UI] Display UI warning';
export const SWITCH_VIEW = '[UI] Switch wiew';
export const SET_CURRENT_USER = '[UI] Set Current User';
export const RATE_USER = '[UI] Move to rating screen';

// Initial state of store.ui (see reducers.js)
let INIT_UI_STATE = {
    loading: false,
    location: 'home',
    currentUser: {
        name: "",
        value: 0
    } 
};

const uiReducer = (state = INIT_UI_STATE, action) => {
    switch (action.type) {
        case INIT_UI:
            // Do nothing as an api middleware already consumed this message
            return {...state};

        case SWITCH_VIEW:
            if (!action.payload) return state;
            return {...state, location: action.payload};

        case SET_CURRENT_USER:
            if (!action.payload) return state;
            return {...state, currentUser: action.payload};

        case UI_WARNING:
            console.log('Displaying UI Warning');
            return {...state};

        default:
            return state;
    }
}

export default uiReducer;