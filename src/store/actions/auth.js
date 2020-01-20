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

export const setCurrentUser = (user) => {
    const gotAuser = user ? true : false;
    let currentUser = null;
    if (gotAuser) {
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email);
        localStorage.setItem('providerId', user.providerId);
        currentUser = { uid: user.uid, email: user.email, providerId: user.providerId };
    }
    return { type: actionTypes.SET_CURRENT_USER, payload: { currentUser } }
}

export const signOut = () => (
    { type: actionTypes.SIGN_OUT }
)

export const providerSignIn = (provider) => {
    return async dispatch => {
        dispatch(authStart());
        if (provider === 'google') {
            const provider = new fb.auth.GoogleAuthProvider();
            try {
                await fb.auth().signInWithPopup(provider);
                dispatch(authSuccess());
            } catch (error) {
                dispatch(authFail(error.message));
            }
        } else if (provider === 'facebook') {
            const provider = new fb.auth.FacebookAuthProvider();
            try {
                await fb.auth().signInWithPopup(provider);
                dispatch(authSuccess());
            } catch (error) {
                dispatch(authFail(error.message));
            }
        }



    }
}

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

