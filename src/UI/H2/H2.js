import React from 'react';
import classes from './H2.module.css';

const h2 = (props) => {
    return (
        <h2 id={props.id} className={classes.h2}>{props.children}</h2>
    );
}

export default h2;