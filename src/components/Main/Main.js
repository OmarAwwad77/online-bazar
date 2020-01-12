import React from 'react';
import Hero from './Hero/Hero';
import classes from './Main.module.css';
import Filters from '../../containers/Filters/Filters';
import H2 from '../../UI/H2/H2';


const Main = () => {
    return (
        <div className={classes.main} >
            <Hero />
            <section className={classes.filters_container}>
                <H2>filter products by categories</H2>
                <Filters />
            </section>

        </div>

    );
}

export default Main;