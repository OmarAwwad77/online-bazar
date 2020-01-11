import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';



const Layout = (props) => {
    return (
        <div className={classes.grid}>
            <Toolbar />
            <main className={classes.grid_main} />
            <footer className={classes.grid_footer} />
        </div>

    );
}

export default Layout;