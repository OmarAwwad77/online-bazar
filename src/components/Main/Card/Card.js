import React from 'react';
import classes from './Card.module.css';
import { ReactComponent as HeartEmpty } from '../../../assets/heart-empty.svg';
import { ReactComponent as HeartSolid } from '../../../assets/heart-solid.svg';
import { ReactComponent as DollarSign } from '../../../assets/dollar-sign.svg';
import { ReactComponent as Clock } from '../../../assets/clock.svg';

const url = 'https://i.picsum.photos/id/0/5616/3744.jpg';


const card = (props) => {

    const heartIcon = props.isFav ?
        <HeartSolid id='icon' style={{ color: '#ff0061' }} onClick={props.toggleFavHandler} />
        :
        <HeartEmpty id='icon' style={{ color: '#ff0061' }} onClick={props.toggleFavHandler} />
        ;

    return (
        <div className={classes.card}>
            <div className={classes.image} style={{ backgroundImage: `url(${url})` }} >
                <div className={classes.overlay}>

                    <span className={classes.svg} onClick={() => alert('fav')}>{heartIcon}</span>
                </div>

            </div>
            <p className={classes.product_title}>MacBook Air 2015</p>
            <div className={classes.card_info}>
                <div className={classes.price}>
                    <DollarSign style={{ marginRight: '-.4rem' }} /><span style={{ fontWeight: '400' }}>500</span>
                </div>
                <div className={classes.time}>
                    <Clock /> <span >2 hours ago</span>
                </div>
            </div>


        </div>
    );
}

export default card;