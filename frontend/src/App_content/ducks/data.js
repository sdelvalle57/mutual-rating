// That's where all the action creators and their reducers live

export const ADD_NEW_ENROLLED = '[Data] Add enrolled users';
export const UPDATE_USER_DATA = '[Data] Update user data';
export const GET_USERS_AVERAGE = '[Data] Retrieve users average';

// Initial state of store.data (see reducers.js)
let INIT_DATA_STATE = {
    enrolled: [],
    user: {
        hash: "",
        name: "",
        rating: 0
    }
};

const dataReducer = (state = INIT_DATA_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_ENROLLED:
            // Great, now we have to merge two arrays and remove duplicates
            // TODO: how does it work exactly (new Set)?
            let arr = [action.payload, state.data.enrolled];
            return {
                ...state, 
                enrolled: [...new Set([].concat(...arr))]
            };

        case UPDATE_USER_DATA:
            // TODO: If received user === current user then update ui.currentUser
            return {
                ...state, 
                user: action.payload
            };

        default:
            return state;
    }
}

export default dataReducer;