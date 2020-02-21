import React from 'react';
import AngleArrow from '../../../../../UI/AngleArrow/AngleArrow';
import classes from './NavItem.module.css';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToolbarQuery } from '../../../../../store/actions';

const NavItem = props => {
	const createUnorderedList = (arr, main) => {
		return (
			<ul className={classes.nested_dropdown}>
				{arr.map(el => (
					<li key={el}>
						<NavLink
							onClick={() => {
								props.setToolbarQuery({
									category: main,
									subCategory: el,
									ascending: 'Sort By Price: Low to High'
								});

								props.closeNav();
							}}
							smooth
							to='/#products'
						>
							{el}
						</NavLink>
					</li>
				))}
			</ul>
		);
	};

	let list = null;
	// [Sign out, change password]

	if (props.config) {
		let listContent = null;
		if (!props.nested) {
			if (props.routes) {
				listContent = Object.keys(props.config).map(key => (
					<li key={key}>
						<NavLink
							onClick={props.callBacks && props.config[key].func}
							to={props.config[key].path}
						>
							{key}
						</NavLink>
					</li>
				));
			}
		} else {
			listContent = Object.keys(props.config).map(el => (
				<li key={el}>
					{/* <NavLink
						smooth
						to='/#products'
						onClick={() =>
							props.setToolbarQuery({
								category: el,
								subCategory: 'All SubCategories',
								ascending: 'Sort By Price: Low to High'
							})
						}
					>
						{el}
					</NavLink> */}
					<a>{el}</a>
					{createUnorderedList(props.config[el], el)}
				</li>
			));
		}

		list = <ul className={classes.main_dropdown}>{listContent}</ul>;
	}

	// const list = props.config ? <ul className={classes.main_dropdown}>
	//     {Object.keys(props.config).map((el) => (
	//         <li key={el}>
	//             <NavLink smooth to="/#products">{el}
	//             </NavLink>
	//             {createUnorderedList(props.config[el])}
	//         </li>))}
	// </ul> : null;

	return (
		<li
			className={classes.nav_item}
			onClick={!props.config ? props.closeNav : undefined}
		>
			<NavLink
				onClick={props.onClick}
				smooth
				exact={props.exact ? true : false}
				activeClassName={props.noActiveStyle ? null : classes.active}
				to={props.path ? props.path : props.location.pathname}
			>
				{props.children}
			</NavLink>
			{props.config ? <AngleArrow /> : null}
			{list}
		</li>
	);
};

const mapDispatchToProps = dispatch => ({
	setToolbarQuery: toolbarQuery => dispatch(setToolbarQuery(toolbarQuery))
});

export default connect(null, mapDispatchToProps)(withRouter(NavItem));
