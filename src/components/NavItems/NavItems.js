import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';


const NavItems = () => {
    return (
        <nav className={classes.main_nav}>
            <ul className={classes.nav_items}>
                <NavItem link="#" config={{ 'Phones': ['Android', 'IOS'], 'Cameras': ['Canon', 'Sony'] }}>Categories</NavItem>
                <NavItem link="#">My Items</NavItem>
                <NavItem link="#">Add Item</NavItem>
                <NavItem link="#">Favourites</NavItem>
                <NavItem link="#">Account</NavItem>
            </ul>
        </nav>
    );
}

export default NavItems;