import React from 'react';
import classes from './Hero.module.css';
import Button from '../../../UI/Button/Button';

const Hero = () => {
    return (
        <section className={classes.hero} >
            <h2>Welcome To</h2>
            <h1>Online Bazar Marketplace</h1>
            <p>Explore from thousands of premium quality second-hand products.</p>
            <section className={classes.hero_action_buttons}>
                <Button active>Explore Now</Button>
                <Button>Become a Seller</Button>
            </section>
        </section>
    );
}

export default Hero;