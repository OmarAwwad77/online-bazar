import React from 'react';
import classes from './Card.module.css';
import TextTruncate from 'react-text-truncate';
import { ReactComponent as DollarSign } from '../../../assets/dollar-sign.svg';
import { ReactComponent as Clock } from '../../../assets/clock.svg';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import TimeAgo from 'timeago-react';

const card = props => {
	const styles = [classes['card'], props.className];

	return (
		<div style={props.style} className={styles.join(' ')}>
			<img alt='' src={props.mainUrl} className={classes['card__image']} />

			<section className={classes['card__description']}>
				<TextTruncate
					text={props.itemDesc}
					line={3}
					truncateText='...'
					containerClassName={classes['card__text']}
				/>

				<div className={classes['card__icons-container']}>
					<div>
						<Clock
							style={{ color: '#4e002d' }}
							className={classes['card__icons']}
						/>
						<TimeAgo
							datetime={props.timeStamp}
							className={classes['card__icon-text']}
						/>
					</div>
					<div>
						<DollarSign
							style={{ color: '#4e002d' }}
							className={classes['card__icons']}
						/>
						<span
							style={{ marginLeft: '0', color: '#4e002d' }}
							className={classes['card__icon-text']}
						>
							{props.itemPrice}
						</span>
					</div>
				</div>

				<div className={classes['card__divider']}></div>

				<div className={classes['card__buttons']}>
					<div
						onClick={props.actions.edit}
						className={classes['card__button-container']}
					>
						<Edit className={classes['card__icons']} />
						<span className={classes['card__icon-text']}>Edit</span>
					</div>
					<div
						onClick={props.actions.delete}
						className={classes['card__button-container']}
					>
						<Trash className={classes['card__icons']} />
						<span className={classes['card__icon-text']}>Delete</span>
					</div>
				</div>
			</section>
		</div>
	);
};

export default card;
