// That's where all the Types definitions and their reducers live

// Types
export const INIT_UI = '[UI] Init UI';
export const UI_WARNING = '[UI] Display UI warning';
export const GO_TO_USER = '[UI] Move to user select screen';
export const GO_TO_RATING = '[UI] Move to rating screen';
export const GO_TO_HOME = '[UI] Move to Home screen';
export const CHANGE_MODAL = '[UI] Toggle modal state';
export const UPDATE_SLIDER = '[UI] Update slider value';
export const SHOW_ALL_RATINGS  = '[UI] Show all ratings for current agent';
export const CHANGE_LOADER = '[UI] Toggle loader state';
export const CHANGE_OPTION = '[UI] Handle option change';

// Initial state of store.ui (see reducers.js)
let INIT_UI_STATE = {
    loading: true,
    modal: {
        isShowing: false,
        text: ""
    },
    sliderValue: 5,
    optionValue: ''
};

const uiReducer = (state = INIT_UI_STATE, action) => {
    switch (action.type) {
        case CHANGE_LOADER:
            return {...state, loading: action.payload};

        case INIT_UI:
            // Do nothing as an api middleware already consumed this message
            return {...state};

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