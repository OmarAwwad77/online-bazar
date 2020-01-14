import React from 'react';
import AngleArrow from '../../../../../UI/AngleArrow/AngleArrow';
import classes from './NavItem.module.css';

const NavItem = (props) => {

    // const list = (props.list ? <ul className={classes.nav_dropdown}> {props.list.map(cat => <li>{cat}</li>)} </ul>
    //     : null
    // );

    const createUnorderedList = (arr) => {
        return <ul className={classes.nested_dropdown}>
            {arr.map((el) => (
                <li key={el} >{el}</li>
            ))}
        </ul>
    }

    const list = props.config ? <ul className={classes.main_dropdown}>
        {Object.keys(props.config).map((el) => (<li key={el} > <a>{el}</a> {createUnorderedList(props.config[el])} </li>))}
    </ul> : null;



    return (
        <li className={classes.nav_item}>
            <a href={props.link}>{props.children}</a>
            {props.config ? <AngleArrow /> : null}
            {list}
        </li>
    );
}

export default NavItem;