// That's where all the action creators and their reducers live

export const ADD_NEW_ENROLLED = '[Data] Add enrolled users';
export const UPDATE_USER_DATA = '[Data] Update user data';
export const SET_CURRENT_AGENT = '[Data] Update Current Agent';
export const RATE_AGENT  = '[Data] Rate Selected Agent';
export const RECEIVE_RATINGS = '[Data] Save ratings for current agent'; // TODO - delete?
export const LOAD_ENROLLED = '[Data] Load all enrolled agents';
export const HANDLE_ENROLL = '[Data] Handle user enrollnmnet';
export const SET_ENROLL_STATUS = '[Data] Set enrollnmnet status';

// Initial state of store.data (see reducers.js)
let INIT_DATA_STATE = {
    enrolled: [],
    enrollStatus: true,
    user: {
        hash: "",
        name: "",
        average: 0
    },
    currentAgent: {
        hash: null,
        name: null,
        overallRating: null,
        categoryRatings: {}
    }
};

const dataReducer = (state = INIT_DATA_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_ENROLLED:
            return {
                ...state,
                enrolled: action.payload
            };

        case UPDATE_USER_DATA:
            return {
                ...state, 
                user: action.payload,
                currentAgent: action.payload
            };

        case RECEIVE_RATINGS:
            if (!action.payload) return state;

            let hashTable = {};
            for (var e in state.enrolled) {
                hashTable[state.enrolled[e].Hash] = state.enrolled[e].Name;
            }
            console.log(hashTable);
            return {
                ...state, 
                currentAgent: {
                    ...state.currentAgent, 
                    receivedReviews: action.payload.map(e => {
                        return {
                            Rater: hashTable[e.Rater],
                            Value: e.Value
                        };
                    })
                }
            };

        case SET_CURRENT_AGENT:
            if (!action.payload) return state;
            return {...state, currentAgent: {...state.currentAgent, ...action.payload}};

        case SET_ENROLL_STATUS:
            return {...state, enrollStatus: action.payload};

        default:
            return state;
    }
}

export default dataReducer;