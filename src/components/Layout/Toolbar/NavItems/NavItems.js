import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = props => {
	return (
		<nav className={classes.main_nav}>
			<ul className={classes.nav_items}>
				{props.items.map((item, i) => {
					let config = null;
					let nested = null;
					let routes = null;
					let callBacks = null;
					if (props.dropDowns) {
						// props.dropDowns.map((dropDown) => {
						//     config = (dropDown.itemIndex === i) ? dropDown.dropDownItems : null;
						// })
						const dropDown = props.dropDowns.filter(
							dropDown => dropDown.itemIndex === i
						);
						if (dropDown[0]) {
							config = dropDown[0].dropDownItems;
							nested = dropDown[0].hasNested;
							routes = dropDown[0].hasRoutes;
							callBacks = dropDown[0].hasCallBacks;
						}
					}
					return (
						<NavItem
							key={item.name}
							path={item.path}
							onClick={item.action}
							exact={item.exact}
							noActiveStyle={item.noActiveStyle}
							routes={routes}
							nested={nested}
							callBacks={callBacks}
							config={config}
						>
							{item.name}
						</NavItem>
					);
				})}
			</ul>
		</nav>
	);
};

export default navItems;
