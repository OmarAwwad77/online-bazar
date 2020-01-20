import * as actionTypes from '../actions/actionTypes';


const initialState = {
    loading: false,
    error: null,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        // case actionTypes.GOOGLE_SIGN_IN:
        //     return {

        //     }

        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };

        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload.currentUser
            }

        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
}

export default authReducer;