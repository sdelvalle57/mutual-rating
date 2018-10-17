// That's where all the action creators and their reducers live

export const ADD_NEW_ENROLLED = '[Data] Add enrolled users';
export const UPDATE_USER_DATA = '[Data] Update user data';
export const GET_USERS_AVERAGE = '[Data] Retrieve users average';
export const SET_CURRENT_AGENT = '[Data] Update Current Agent';
export const RATE_AGENT  = '[Data] Rate Selected Agent';
export const RECEIVE_RATINGS = '[Data] Save ratings for current agent';

// Initial state of store.data (see reducers.js)
let INIT_DATA_STATE = {
    enrolled: [],
    user: {
        Hash: "",
        Name: "",
        Rating: 0
    },
    currentAgent: {
        Hash: "",
        Name: "",
        Value: 0,
        ReceivedReviews: []
    }
};

const dataReducer = (state = INIT_DATA_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_ENROLLED:
            // Great, now we have to merge two arrays and remove duplicates
            // TODO: how does it work exactly (new Set)?
            let arr = [action.payload, state.enrolled];
            return {
                ...state,
                enrolled: [...new Set([].concat(...arr))]
            };

        case UPDATE_USER_DATA:
            // Reset ReceivedReviews
            action.payload.ReceivedReviews = [];
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
                    ReceivedReviews: action.payload.map(e => {
                        return {
                            Rater: e.Rater,//hashTable[e.Rater],
                            Value: e.Value
                        };
                    })
                }
            };

        case SET_CURRENT_AGENT:
            if (!action.payload) return state;
            return {...state, currentAgent: {...state.currentAgent, ...action.payload}};

        default:
            return state;
    }
}

export default dataReducer;