import React from 'react';
import AngleArrow from '../../../UI/AngleArrow/AngleArrow';
import classes from './NavItem.module.css';

const NavItem = (props) => {

    const list = (props.list ? <ul className={classes.nav_dropdown}> {props.list.map(cat => <li>{cat}</li>)} </ul>
        : null
    );
    return (
        <li className={classes.nav_item}>
            <a href={props.link}>{props.children}</a>
            {props.list ? <AngleArrow /> : null}
            {list}
        </li>
    );
}

export default NavItem;