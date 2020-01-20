import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
    return (
        <nav className={classes.main_nav}>
            <ul className={classes.nav_items}>
                {props.items.map((item, i) => {
                    let config = null;
                    if (props.dropDowns) {
                        // props.dropDowns.map((dropDown) => {
                        //     config = (dropDown.itemIndex === i) ? dropDown.dropDownItems : null;
                        // })
                        const dropDown = props.dropDowns.filter((dropDown) => (dropDown.itemIndex === i));
                        config = dropDown[0] && dropDown[0].dropDownItems;
                    }
                    return <NavItem
                        key={item.name}
                        path={item.path}
                        relative={item.relative}
                        exact={item.exact}
                        noActiveStyle={item.noActiveStyle}
                        config={config} >
                        {item.name}
                    </NavItem>;
                }
                )}
            </ul>
        </nav>
    );
}

export default navItems;