import React from 'react';
import classes from './Layout.module.css';
import Toolbar from './Toolbar/Toolbar';
import Footer from './Footer/Footer';


const Layout = (props) => {
    const auth = false;
    return (
        <div className={classes.grid}>
            <Toolbar auth={auth} />
            {props.children}
            <Footer styleClass={classes.grid_footer} />
        </div>

    );
}

export default Layout;