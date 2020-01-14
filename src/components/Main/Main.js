import React from 'react';
import Hero from './Hero/Hero';
import classes from './Main.module.css';
import Filters from './Filters/Filters';
import H2 from '../../UI/H2/H2';
import Card from './Card/Card'


const Main = () => {
    return (
        <div className={classes.main} >
            <Hero />
            <section className={classes.filters_container}>
                <H2>filter products by categories</H2>
                <Filters />
            </section>
            <section className={classes.card_container}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </section>


        </div>

    );
}

export default Main;