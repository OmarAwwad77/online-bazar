import * as actionTypes from '../actions/actionTypes';


const initialState = {
    loading: false,
    error: null,
    user: null,
    reAuth: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                user: null,
            }

        case actionTypes.SIGN_OUT_FAIL:
            return {
                ...state,
                error: action.payload.error,
            }

        case actionTypes.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                reAuth: 'change'
            }

        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                reAuth: null,
                loading: false,
            }

        case actionTypes.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case actionTypes.REAUTH_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.REAUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case actionTypes.DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                user: null,
                loading: false,
                reAuth: null
            }

        case actionTypes.DELETE_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case actionTypes.DELETE_ACCOUNT_REQUEST:
            return {
                ...state,
                reAuth: 'delete'
            }

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