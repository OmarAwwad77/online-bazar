import React, { Fragment } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import Sign from './components/Sign/Sign';
import ReAuth from './components/ReAuth/ReAuth';
import SignOut from './components/SignOut/SignOut';
import AddItem from './components/AddItem/AddItem';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions';
import fb from './config/configfb';
import MyItems from './components/MyItems/MyItems';
import WithModelComponent from './components/Model/WithModelComponent';
import Favorites from './components/Favorites/Favorites';
import ItemDetails from './components/ItemDetails/ItemDetails';

function App(props) {
	const isAuth = localStorage.getItem('uid') || props.auth;
	!isAuth &&
		fb.auth().onAuthStateChanged(ur => {
			const user = ur && {
				uid: ur.uid,
				email: ur.email,
				providerId: ur.providerData[0].providerId
			};
			props.setCurrentUser(user);
			console.log('have an auth listener');
		});

	!props.auth &&
		localStorage.getItem('uid') &&
		props.setCurrentUser('localStorage');

	const mainRoutes = (
		<>
			<Route component={Sign} path={['/sign', '/add-item']} />
			<Route component={Main} path='/' />
		</>
	);
	const routes = (
		<Fragment>
			{/* <Route
				render={() => (
					<WithModelComponent
						modelStyles={{ width: '50%', height: '90%', overflowX: 'hidden' }}
						usingRouter
					>
						{close => <ItemDetails close={close} />}
					</WithModelComponent>
				)}
				path={['/:path/item-details', '/item-details']}
			/> */}
			<Route
				component={ItemDetails}
				path={['/:path/item-details', '/item-details']}
			/>
			<Route component={ReAuth} path='/:path/re-auth' />
			<Route component={SignOut} path='/sign-out' />
			<Route
				render={props => <AddItem withModel {...props} />}
				path='/:path/edit-item'
			/>
			{/* <Route
				render={props => (
					<WithModelComponent
						modelStyles={{ width: '50%', height: '80%' }}
						usingRouter
					>
						{close => <AddItem />}
					</WithModelComponent>
				)}
				path='/:path/edit-item'
			/> */}
			<Switch>
				<Route component={Favorites} path='/favorites' />
				<Route component={AddItem} path='/add-item' />
				<Route component={MyItems} path='/my-items' />
				<Route component={Main} path='/' />>
			</Switch>
		</Fragment>
	);
	return (
		<div className='App'>
			<Layout
				setSignRedirectPath={props.setSignRedirectPath}
				isAuth={isAuth}
				changePasswordRequest={props.changePasswordRequest}
				deleteAccountRequest={props.deleteAccountRequest}
				setCurrentUser={props.setCurrentUser}
				providerId={props.providerId}
			>
				{isAuth ? routes : mainRoutes}
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
			dispatch(actionCreators.setSignRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
