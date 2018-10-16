// That's where all the action creators and their reducers live

export const ADD_NEW_ENROLLED = '[Data] Add enrolled users';
export const UPDATE_USER_DATA = '[Data] Update user data';
export const GET_USERS_AVERAGE = '[Data] Retrieve users average';
export const SET_CURRENT_AGENT = '[Data] Update Current Agent';
export const RATE_AGENT  = '[Data] Rate Selected Agent';

// Initial state of store.data (see reducers.js)
let INIT_DATA_STATE = {
    enrolled: [],
    user: {
        hash: "",
        name: "",
        rating: 0
    },
    currentAgent: {
        hash: "",
        name: "",
        value: 0
    }
};

const dataReducer = (state = INIT_DATA_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_ENROLLED:
            // Great, now we have to merge two arrays and remove duplicates:
            // 1. Concat two arrays with spread operator and pass as an argument to Set
            // 2. Create ES6 Set (a collection of unordered distinct elements)
            // 3. Insert values of this Set into an array with help of spread operator
            return {
                ...state, 
                enrolled: [...new Set(...action.payload, ...state.enrolled)]
            };

        case UPDATE_USER_DATA:

            return {
                ...state, 
                user: action.payload,
                currentAgent: action.payload
            };

        case SET_CURRENT_AGENT:
            if (!action.payload) return state;
            return {...state, currentAgent: {...state.currentAgent, ...action.payload}};

        default:
            return state;
    }
}

export default dataReducer;