import React from 'react';
import classes from './Layout.module.css';
import Toolbar from './Toolbar/Toolbar';
import Footer from './Footer/Footer';

const Layout = props => {
	// const isAuth = localStorage.getItem('uid') || props.auth;
	// !isAuth &&
	// 	fb.auth().onAuthStateChanged(ur => {
	// 		const user = ur && {
	// 			uid: ur.uid,
	// 			email: ur.email,
	// 			providerId: ur.providerData[0].providerId
	// 		};
	// 		props.setCurrentUser(user);
	// 		console.log('have an auth listener');
	// 	});

	// !props.auth &&
	// 	localStorage.getItem('uid') &&
	// 	props.setCurrentUser('localStorage');

	const addItemAction = props.isAuth
		? null
		: () => props.setSignRedirectPath('/add-item');
	return (
		<div className={classes.grid}>
			<Toolbar
				auth={props.isAuth}
				actions={{
					'Sing Out': null,
					'Change Password': props.changePasswordRequest,
					'Delete Account': props.deleteAccountRequest,
					'Sign in/up': () => props.setSignRedirectPath('/'),
					'Add Item': addItemAction
				}}
				providerId={props.providerId}
			/>
			{props.children}
			<Footer styleClass={classes.grid_footer} />
		</div>
	);
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		setCurrentUser: user => dispatch(actionCreators.setCurrentUser(user)),
// 		deleteAccountRequest: () => dispatch(actionCreators.deleteAccountRequest()),
// 		changePasswordRequest: () =>
// 			dispatch(actionCreators.changePasswordRequest()),
// 		setSignRedirectPath: path =>
// 			dispatch(actionCreators.setSignRedirectPath(path))
// 	};
// };

// const mapStateToProps = ({ user }) => {
// 	return {
// 		auth: user ? true : false,
// 		providerId: user ? user.providerId : null
// 	};
// };

export default Layout;
