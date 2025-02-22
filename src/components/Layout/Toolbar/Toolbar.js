import React, { useState } from 'react';
import classes from './Toolbar.module.css';
import NavItems from './NavItems/NavItems';
import Logo from '../../../UI/Logo/Logo';
import { ReactComponent as Bars } from '../../../assets/bars.svg';
import { withRouter } from 'react-router-dom';

const Toolbar = props => {
	const [barsS, setBarsS] = useState(null);
	// const knownPaths = [
	// 	'/add-item',
	// 	'/my-items',
	// 	'/my-items/edit-item',
	// 	'/item-details',
	// 	'/favorites',
	// 	'/favorites/item-details'
	// ];
	// const currentPath = props.location.pathname;

	// const toolbarBackgroundColor =
	// 	knownPaths.includes(currentPath) ||
	// 	currentPath.substr(currentPath.lastIndexOf('/')) === '/re-auth'
	// 		? { backgroundColor: 'rgba(0,0,0,0.1)' }
	// 		: { backgroundColor: '#fff' };
	const currentPath = props.location.pathname;
	const toolbarBackgroundColor = ['/', '/#products'].includes(currentPath)
		? { backgroundColor: '#fff' }
		: { backgroundColor: 'rgba(0,0,0,0.1)' };

	const links = [
		{
			name: 'Home',
			path: '/',
			exact: true
		},
		{
			name: 'Categories',

			noActiveStyle: true
		},
		{
			name: 'Add Item',
			path: '/add-item',
			action: props.actions['Add Item']
		}
	];

	const dropDowns = [
		{
			itemIndex: 1,
			hasNested: true,
			dropDownItems: {
				Phones: ['Android', 'IOS'],
				Cameras: ['Canon', 'Sony'],
				Laptops: ['MacOs', 'Windows'],
				Tablets: ['IPad', 'Android']
			}
		}
	];

	props.auth &&
		dropDowns.push({
			itemIndex: 5,
			hasRoutes: true,
			hasCallBacks: true,
			dropDownItems: {
				'Sing Out': { func: () => {}, path: '/sign-out' },
				'Change Password': {
					func: () => {},
					path:
						props.location.pathname === '/'
							? '/re-auth'
							: props.location.pathname + '/re-auth'
				},
				'Delete Account': {
					func: () => {},
					path:
						props.location.pathname === '/'
							? '/re-auth'
							: props.location.pathname + '/re-auth'
				}
			}
		});

	const signWithPassword =
		props.providerId !== 'google.com' && props.providerId !== 'facebook.com';

	!signWithPassword &&
		delete dropDowns[dropDowns.length - 1].dropDownItems['Change Password'];
	dropDowns.forEach((dropDown, i) => {
		if (dropDown.hasCallBacks) {
			Object.keys(dropDown.dropDownItems).forEach(key => {
				dropDowns[i].dropDownItems[key].func = () => {
					setBarsS(prevState => !prevState);
					props.actions[key] && props.actions[key]();
				};
				// dropDowns[i].dropDownItems[key].func = props.actions[key];
			});
		}
	});

	!props.auth
		? links.push({
				name: 'Sign in/up',
				path: '/sign',
				action: props.actions['Sign in/up']
		  })
		: links.push(
				{
					name: 'My Items',
					path: '/my-items'
				},
				{
					name: 'Favorites',
					path: '/favorites'
				},
				{
					name: 'Account',
					noActiveStyle: true
				}
		  );

	return (
		<header style={{ ...toolbarBackgroundColor }} className={classes.toolbar}>
			<Logo
				height='80%'
				onClick={() => props.history.push('/')}
				spanFirst='#ff0061'
				spanSecond='#4e002d'
			/>
			<Bars
				className={classes['bars-icon']}
				onClick={() => setBarsS(prevState => !prevState)}
			/>
			<NavItems
				closeNav={() => setBarsS(false)}
				items={links}
				show={barsS}
				dropDowns={dropDowns}
			/>
		</header>
	);
};

export default withRouter(Toolbar);
