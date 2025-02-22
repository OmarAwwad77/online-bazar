import * as actionTypes from './actionTypes';
import fb, { db } from '../../config/configfb';

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = () => ({ type: actionTypes.AUTH_SUCCESS });

export const authFail = (error) => ({
	type: actionTypes.AUTH_FAIL,
	payload: { error },
});

const setLocalStorage = (user) => {
	localStorage.setItem('uid', user.uid);
	localStorage.setItem('email', user.email);
	localStorage.setItem('providerId', user.providerId);
};

const clearLocalStorage = () => {
	localStorage.clear();
};

export const setCurrentUser = (user) => {
	if (user === 'localStorage') {
		return {
			type: actionTypes.SET_CURRENT_USER,
			payload: {
				currentUser: {
					uid: localStorage.getItem('uid'),
					email: localStorage.getItem('email'),
					providerId: localStorage.getItem('providerId'),
				},
			},
		};
	} else if (user !== null) {
		let currentUser = {
			uid: user.uid,
			email: user.email,
			providerId: user.providerId,
		};
		setLocalStorage(user);
		return { type: actionTypes.SET_CURRENT_USER, payload: { currentUser } };
	}

	return { type: actionTypes.SET_CURRENT_USER, payload: { currentUser: null } };
};

const signOutSuccess = () => ({ type: actionTypes.SIGN_OUT_SUCCESS });

const signOutFail = (error) => ({
	type: actionTypes.SIGN_OUT_FAIL,
	payload: { error },
});

export const signOut = () => {
	clearLocalStorage();
	return async (dispatch) => {
		try {
			await fb.auth().signOut();
			dispatch(signOutSuccess());
		} catch (error) {
			dispatch(signOutFail(error.message));
		}
	};
};

export const providerSignIn = (provider) => {
	return async (dispatch) => {
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
	};
};

export const auth = (email, password, isSignIn) => {
	const setAuthError = (errorCode) => {
		const errorObj = {};
		if (errorCode === 'auth/email-already-in-use') {
			errorObj.message = 'The Email Address Already Exists';
		} else if (errorCode === 'auth/user-not-found') {
			errorObj.message = "This Account Doesn't Exist ";
		} else if (errorCode === 'auth/wrong-password') {
			errorObj.message = 'The Password is Invalid';
		}
		return errorObj;
	};
	return async (dispatch) => {
		dispatch(authStart());
		if (isSignIn) {
			try {
				await fb.auth().signInWithEmailAndPassword(email, password);
				dispatch(authSuccess());
			} catch (error) {
				dispatch(authFail(setAuthError(error.code)));
			}
		} else {
			try {
				await fb.auth().createUserWithEmailAndPassword(email, password);
				dispatch(authSuccess());
			} catch (error) {
				dispatch(authFail(setAuthError(error.code)));
			}
		}
	};
};

export const clearAuthError = () => ({ type: actionTypes.CLEAR_AUTH_ERROR });

const reAuthStart = () => ({ type: actionTypes.REAUTH_START });

const reAuthFail = (error) => ({
	type: actionTypes.REAUTH_FAIL,
	payload: { error },
});

export const deleteAccountRequest = () => ({
	type: actionTypes.DELETE_ACCOUNT_REQUEST,
});

const deleteAccountSuccess = () => ({
	type: actionTypes.DELETE_ACCOUNT_SUCCESS,
});

const deleteAccountFail = (error) => ({
	type: actionTypes.DELETE_ACCOUNT_FAIL,
	payload: { error },
});

const deleteAccount = (user) => {
	return async (dispatch) => {
		try {
			dispatch({ type: actionTypes.CLEAR_MY_ITEMS });

			const querySnapshot = await db
				.collection('items')
				.where('ownerUid', '==', user.uid)
				.get();

			querySnapshot.forEach(async (doc) => {
				await doc.ref.delete();
			});

			clearLocalStorage();
			await user.delete();
			dispatch(deleteAccountSuccess());
		} catch (error) {
			console.log(error);
			dispatch(deleteAccountFail(error.message));
		}
	};
};

export const changePasswordRequest = () => ({
	type: actionTypes.CHANGE_PASSWORD_REQUEST,
});

const changePasswordSuccess = () => ({
	type: actionTypes.CHANGE_PASSWORD_SUCCESS,
});

const changePasswordFail = (error) => ({
	type: actionTypes.CHANGE_PASSWORD_FAIL,
	payload: { error },
});

const changePassword = (user, password) => {
	return async (dispatch) => {
		try {
			await user.updatePassword(password);
			dispatch(changePasswordSuccess());
		} catch (error) {
			dispatch(changePasswordFail(error.message));
		}
	};
};

export const reAuth = (user, isDeleteAction, credentialsObj = null) => {
	return async (dispatch) => {
		if (credentialsObj) {
			const credentials = fb.auth.EmailAuthProvider.credential(
				credentialsObj.email,
				credentialsObj.password
			);
			dispatch(reAuthStart());
			try {
				await user.reauthenticateWithCredential(credentials);
				isDeleteAction
					? dispatch(deleteAccount(user))
					: dispatch(changePassword(user, credentialsObj.newPassword));
			} catch (error) {
				dispatch(reAuthFail(error.message));
			}

			// reauthenticateWithCredential(credential)
		} else {
			const authProvider =
				user.providerData[0].providerId === 'google.com'
					? new fb.auth.GoogleAuthProvider()
					: new fb.auth.FacebookAuthProvider();
			dispatch(reAuthStart());
			try {
				await user.reauthenticateWithPopup(authProvider);
				dispatch(deleteAccount(user));
			} catch (error) {
				dispatch(reAuthFail(error.message));
			}
		}
	};
};

export const setSignRedirectPath = (path) => ({
	type: actionTypes.SET_SIGN_REDIRECT_PATH,
	payload: { path },
});

export const resetRedirectAuth = () => ({
	type: actionTypes.RESET_REDIRECT,
});
