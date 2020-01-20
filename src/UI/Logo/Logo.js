import React from 'react';
import classes from './Logo.module.css';
import logoDark from '../../assets/logo-dark.png';
import logoBright from '../../assets/logo-bright.png';

const logo = (props) => {
    const logo = props.bright ? logoBright : logoDark;
    return (
        <div style={{ height: props.height }} className={classes.logo_container}>
            {/* <Logo className={classes.logo} /> */}
            <img className={classes.logo_image} src={logo} />
            <span className={classes.logo_text} style={{ color: props.spanSecond, fontSize: props.spanFontSize }} ><span style={{ color: props.spanFirst }}>Online</span>Bazar</span>
        </div>
    );
}

export default logo;