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

const setLocalStorage = (user) => {
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('email', user.email);
    localStorage.setItem('providerId', user.providerId);
}

const clearLocalStorage = () => {
    localStorage.clear();
}

export const setCurrentUser = (user) => {
    if (user === 'localStorage') {
        return {
            type: actionTypes.SET_CURRENT_USER,
            payload: {
                currentUser:
                {
                    uid: localStorage.getItem('uid'),
                    email: localStorage.getItem('email'),
                    providerId: localStorage.getItem('providerId')
                }
            }
        }
    } else if (user !== null) {
        let currentUser = { uid: user.uid, email: user.email, providerId: user.providerId };
        setLocalStorage(user);
        return { type: actionTypes.SET_CURRENT_USER, payload: { currentUser } }

    }

    return { type: actionTypes.SET_CURRENT_USER, payload: { currentUser: null } }
}

const signOutSuccess = () => (
    { type: actionTypes.SIGN_OUT_SUCCESS }
)

const signOutFail = (error) => (
    { type: actionTypes.SIGN_OUT_FAIL, payload: { error } }
)

export const signOut = () => {
    clearLocalStorage();
    return async dispatch => {
        try {
            await fb.auth().signOut();
            dispatch(signOutSuccess());
        } catch (error) {
            dispatch(signOutFail(error.message));
        }
    }
}

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

const reAuthStart = () => (
    { type: actionTypes.REAUTH_START }
)

const reAuthFail = (error) => (
    { type: actionTypes.REAUTH_FAIL, payload: { error } }
)

export const deleteAccountRequest = () => (
    { type: actionTypes.DELETE_ACCOUNT_REQUEST }
)


const deleteAccountSuccess = () => (
    { type: actionTypes.DELETE_ACCOUNT_SUCCESS }
)

const deleteAccountFail = (error) => (
    { type: actionTypes.DELETE_ACCOUNT_FAIL, payload: { error } }
)

const deleteAccount = (user) => {
    return async dispatch => {
        try {
            clearLocalStorage();
            await user.delete();
            dispatch(deleteAccountSuccess());
        } catch (error) {
            dispatch(deleteAccountFail(error.message));
        }
    }
}

export const changePasswordRequest = () => (
    { type: actionTypes.CHANGE_PASSWORD_REQUEST }
)

const changePasswordSuccess = () => (
    { type: actionTypes.CHANGE_PASSWORD_SUCCESS }
)

const changePasswordFail = (error) => (
    { type: actionTypes.CHANGE_PASSWORD_FAIL, payload: { error } }
)

const changePassword = (user, password) => {
    return async dispatch => {
        try {
            await user.updatePassword(password);
            dispatch(changePasswordSuccess())
        } catch (error) {
            dispatch(changePasswordFail(error.message))
        }
    }
}

export const reAuth = (user, isDeleteAction, credentialsObj = null) => {

    return async dispatch => {
        if (credentialsObj) {
            const credentials = fb.auth.EmailAuthProvider.credential(credentialsObj.email, credentialsObj.password);
            dispatch(reAuthStart());
            try {
                await user.reauthenticateWithCredential(credentials);
                isDeleteAction ?
                    dispatch(deleteAccount(user)) :
                    dispatch(changePassword(user, credentialsObj.newPassword));
            } catch (error) {
                dispatch(reAuthFail(error.message));
            }

            // reauthenticateWithCredential(credential)
        } else {
            const authProvider = (user.providerData[0].providerId === 'google.com') ? new fb.auth.GoogleAuthProvider()
                : new fb.auth.FacebookAuthProvider();
            dispatch(reAuthStart());
            try {
                await user.reauthenticateWithPopup(authProvider);
                dispatch(deleteAccount(user));
            } catch (error) {
                dispatch(reAuthFail(error.message));
            }

        }
    }

}
