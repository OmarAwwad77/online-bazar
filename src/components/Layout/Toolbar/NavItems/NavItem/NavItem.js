import React from 'react';
import AngleArrow from '../../../../../UI/AngleArrow/AngleArrow';
import classes from './NavItem.module.css';
import { NavHashLink as NavLink } from 'react-router-hash-link';

const NavItem = (props) => {

    const createUnorderedList = (arr) => {
        return <ul className={classes.nested_dropdown}>
            {arr.map((el) => (
                <li key={el} ><NavLink smooth to="/home/#products">{el}</NavLink></li>
            ))}
        </ul>
    }

    const list = props.config ? <ul className={classes.main_dropdown}>
        {Object.keys(props.config).map((el) => (
            <li key={el} >
                <NavLink smooth to="/home/#products">{el}
                </NavLink>
                {createUnorderedList(props.config[el])}
            </li>))}
    </ul> : null;



    return (
        <li className={classes.nav_item}>
            <NavLink smooth activeClassName={props.noActiveStyle ? null : classes.active} to={props.path}>{props.children}</NavLink>
            {props.config ? <AngleArrow /> : null}
            {list}
        </li>
    );
}

export default NavItem;