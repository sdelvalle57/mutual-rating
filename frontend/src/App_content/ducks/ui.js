// That's where all the Types definitions and their reducers live

// Types
export const INIT_UI = '[UI] Init UI';
export const UI_WARNING = '[UI] Display UI warning';
export const SWITCH_VIEW = '[UI] Switch wiew';
export const GO_TO_RATING = '[UI] Move to rating screen';
export const GO_TO_HOME = '[UI] Move to Home screen';
export const CHANGE_MODAL = '[UI] Toggle modal state';
export const UPDATE_SLIDER = '[UI] Update slider value';

// Initial state of store.ui (see reducers.js)
let INIT_UI_STATE = {
    loading: false,
    modal: {
        isShowing: false,
        text: ""
    },
    sliderValue: 5,
    location: 'home' 
};

const uiReducer = (state = INIT_UI_STATE, action) => {
    switch (action.type) {
        case INIT_UI:
            // Do nothing as an api middleware already consumed this message
            return {...state};

        case SWITCH_VIEW:
            if (!action.payload) return state;
            return {...state, location: action.payload};

        case CHANGE_MODAL:
            return {...state, modal: action.payload};

        case UPDATE_SLIDER:
            return {...state, sliderValue: action.payload};

        case UI_WARNING:
            console.log('Displaying UI Warning');
            return {...state};

        default:
            return state;
    }
}

export default uiReducer;