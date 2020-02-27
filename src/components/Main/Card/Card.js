import React from 'react';
import classes from './Card.module.css';
import { ReactComponent as HeartEmpty } from '../../../assets/heart-empty.svg';
import { ReactComponent as HeartSolid } from '../../../assets/heart-solid.svg';
import { ReactComponent as DollarSign } from '../../../assets/dollar-sign.svg';
import { ReactComponent as Clock } from '../../../assets/clock.svg';
import { ReactComponent as Info } from '../../../assets/info.svg';
import TimeAgo from 'timeago-react';

const card = props => {
	const heartIcon = props.isFav ? (
		<HeartSolid id='icon' style={{ color: '#ff0061' }} />
	) : (
		<HeartEmpty id='icon' style={{ color: '#ff0061' }} />
	);
	return (
		<div style={props.style} className={classes.card}>
			<div
				className={classes.image}
				style={{ backgroundImage: `url(${props.url})` }}
			>
				{props.isFav !== undefined && (
					<div className={classes.overlay}>
						<span className={classes.svg} onClick={props.toggleFavHandler}>
							{heartIcon}
						</span>
					</div>
				)}
			</div>
			<p className={classes.product_title}>{props.itemName}</p>
			<div className={classes.card_info}>
				<div className={classes.price}>
					<DollarSign style={{ marginRight: '-.4rem' }} />
					<span style={{ fontWeight: '400' }}>{props.itemPrice}</span>
				</div>
				<div className={classes.info} onClick={props.infoClicked}>
					<Info /> <span>details</span>
				</div>
				<div className={classes.time}>
					<Clock /> <TimeAgo datetime={props.timeStamp} />
				</div>
			</div>
		</div>
	);
};

export default card;
