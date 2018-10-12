// That's where all the action creators and their reducers live

export const SELECT_USER = '[Data] Select user to rate';

// Initial state of store.data (see reducers.js)
let INIT_DATA_STATE = {
    homeRating: 8.3323,
    ratedUser: ""
};

const dataReducer = (state = INIT_DATA_STATE, action) => {
    switch (action.type) {
        case SELECT_USER:
            if (!action.payload) return state;
            return {...state, ratedUser: action.payload};

        default:
            return state;
    }
}

export default dataReducer;