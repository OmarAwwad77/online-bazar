import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };

        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload.user
            }

        case actionTypes.AUTH_SUCCESS:
            return {
                loading: false,
                user: action.payload.user
            };

        case actionTypes.AUTH_FAIL:
            return {
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
}

export default authReducer;