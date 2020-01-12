import React from 'react';
import classes from './H2.module.css';

const H2 = (props) => {
    return (
        <h2 className={classes.h2}>{props.children}</h2>
    );
}

export default H2;