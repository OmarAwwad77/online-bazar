import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import ReAuth from './components/ReAuth/ReAuth';
import SignOut from './components/SignOut/SignOut';
import AddItem from './components/AddItem/AddItem';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions';
import fb from './config/configfb';
import MyItems from './components/MyItems/MyItems';
import Favorites from './components/Favorites/Favorites';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Sign from './components/Sign/Sign';
import { useTransition, animated } from 'react-spring';
import Backdrop from './components/Model/Backdrop';

const AnimatedRouteSign = props => {
	console.log('App: animated Router rendering');
	const transition = useTransition(
		props.location,
		location => location.pathname,
		{
			from: {
				opacity: 0,
				width: '100vw',
				height: '100vh',
				position: 'fixed',
				transform: `translateY(-50%)`,
				pointerEvents: 'none',
				zIndex: 300
			},
			enter: { opacity: 1, transform: `translateY(0%)` },
			leave: { opacity: 0, transform: `translateY(-50%)` }
		}
	);

	return transition.map(({ item, key, props: animProps }) => (
		<animated.div key={key} style={animProps}>
			<Switch location={item}>
				<Route component={Sign} path={['/sign', '/add-item']} />
			</Switch>
		</animated.div>
	));
};

function App(props) {
	console.log('App: rendering');
	useEffect(() => {
		if (localStorage.getItem('uid')) {
			props.setCurrentUser('localStorage');
		}
		fb.auth().onAuthStateChanged(ur => {
			const user = ur && {
				uid: ur.uid,
				email: ur.email,
				providerId: ur.providerData[0].providerId
			};
			props.setCurrentUser(user);
		});
	}, []);
	// const isAuth = localStorage.getItem('uid') || props.auth;
	// !isAuth &&
	// fb.auth().onAuthStateChanged(ur => {
	// 	const user = ur && {
	// 		uid: ur.uid,
	// 		email: ur.email,
	// 		providerId: ur.providerData[0].providerId
	// 	};
	// 	props.setCurrentUser(user);
	// 	console.log('have an auth listener');
	// });

	// !props.auth &&
	// 	localStorage.getItem('uid') &&
	// 	props.setCurrentUser('localStorage');

	const mainRoutes = (
		<>
			{/* <Route component={Sign} path={['/sign', '/add-item']} /> */}
			<Route component={ItemDetails} path={['/item-details/:itemId']} />
			<Route component={Backdrop} path={['/sign', '/add-item']} />
			<Route component={Main} path='/' />
			<AnimatedRouteSign location={useLocation()} />
		</>
	);

	const routes = (
		<>
			<Route
				component={ItemDetails}
				path={['/:path/item-details/:itemId', '/item-details/:itemId']}
			/>
			<Route component={ReAuth} path={['/:path/re-auth', '/re-auth']} />
			<Route component={SignOut} path='/sign-out' />

			{/* <Route
				render={props => <AddItem {...props} withModel={true} />}
				path='/:path/edit-item/:itemId'
			/> */}
			<Switch>
				<Route component={Favorites} path='/favorites' />
				<Route component={AddItem} path='/add-item' />
				<Route component={MyItems} path='/my-items' />
				<Route
					component={Main}
					exact
					path={['/', '/item-details/:itemId', '/#products']}
				/>
				<Route render={props => <Redirect to='/' />} path='/' />
			</Switch>
		</>
	);
	return (
		<div className='App'>
			<Layout
				setShouldRedirect={props.setShouldRedirect}
				setSignRedirectPath={props.setSignRedirectPath}
				isAuth={props.auth}
				changePasswordRequest={props.changePasswordRequest}
				deleteAccountRequest={props.deleteAccountRequest}
				setCurrentUser={props.setCurrentUser}
				providerId={props.providerId}
			>
				{props.auth ? routes : mainRoutes}
			</Layout>
		</div>
	);
}

const mapStateToProps = ({ auth }) => {
	return {
		auth: auth.user ? true : false,
		providerId: auth.user ? auth.user.providerId : null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setCurrentUser: user => dispatch(actionCreators.setCurrentUser(user)),
		deleteAccountRequest: () => dispatch(actionCreators.deleteAccountRequest()),
		changePasswordRequest: () =>
			dispatch(actionCreators.changePasswordRequest()),
		setSignRedirectPath: path =>
			dispatch(actionCreators.setSignRedirectPath(path)),
		clearAuthError: () => dispatch(actionCreators.clearAuthError()),
		setShouldRedirect: val => dispatch(actionCreators.setShouldRedirect(val))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
