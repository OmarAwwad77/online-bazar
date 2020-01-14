import React from 'react';
// import { ReactComponent as Logo } from '../../assets/logo.svg';
import classes from './Toolbar.module.css'
import NavItems from './NavItems/NavItems';
import Logo from '../../../UI/Logo/Logo';

const Toolbar = () => {
    return (
        <header className={classes.toolbar}>
            <Logo height='80%' spanFrist="#ff0061" spanSecond="#4e002d" />
            <NavItems />
        </header>
    );
}

export default Toolbar;