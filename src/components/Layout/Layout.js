import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';



const Layout = (props) => {
    return (
        <div className={classes.grid}>
            <Toolbar className={classes.my_toolbar} />
            {props.children}
            <footer className={classes.grid_footer} />
        </div>

    );
}

export default Layout;