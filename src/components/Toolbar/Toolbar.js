import React from 'react';
// import { ReactComponent as Logo } from '../../assets/logo.svg';
import logoPng from '../../assets/logopng.png'
import classes from './Toolbar.module.css'
import NavItems from '../NavItems/NavItems';

const Toolbar = () => {
    return (
        <header className={classes.toolbar}>
            <div className={classes.logo_container}>
                {/* <Logo className={classes.logo} /> */}
                <img className={classes.logo} src={logoPng} />
                <span className={classes.logo_text} ><span>Online</span>Bazar</span>
            </div>

            <NavItems />
        </header>
    );
}

export default Toolbar;