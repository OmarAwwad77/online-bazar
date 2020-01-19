import * as actionTypes from './actionTypes';
import fb from '../../config/configfb';

export const authStart = () => (
    { type: actionTypes.AUTH_START }
)

export const authSuccess = () => (
    { type: actionTypes.AUTH_SUCCESS }
)

export const authFail = (error) => (
    { type: actionTypes.AUTH_FAIL, payload: { error } }
)

export const setCurrentUser = (user) => (
    { type: actionTypes.SET_CURRENT_USER, payload: { user } }
)

export const auth = (email, password, isSignIn) => {
    return async dispatch => {
        dispatch(authStart());
        if (isSignIn) {
            try {
                await fb.auth().signInWithEmailAndPassword(email, password);
                dispatch(authSuccess());
            } catch (error) {
                console.log(error.message);
                dispatch(authFail(error.message));
            }
        } else {
            try {
                await fb.auth().createUserWithEmailAndPassword(email, password);
                dispatch(authSuccess());
            } catch (error) {
                console.log(error.message);
                dispatch(authFail(error.message));
            }
        }
    }
}

