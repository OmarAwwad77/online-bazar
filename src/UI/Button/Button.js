import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    const styles = [classes.button];
    props.active && styles.push(classes.active);
    return (
        <a className={styles.join(' ')} herf="#" onClick={() => alert("clicked")}>{props.children}</a>
    );
}

export default Button;