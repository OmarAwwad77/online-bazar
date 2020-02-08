import React from 'react';
import classes from './Card.module.css';
import TextTruncate from 'react-text-truncate';
import { ReactComponent as DollarSign } from '../../../assets/dollar-sign.svg';
import { ReactComponent as Clock } from '../../../assets/clock.svg';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { ReactComponent as Trash } from '../../../assets/trash.svg';

const card = props => {
	const url = 'https://i.picsum.photos/id/0/5616/3744.jpg';
	const styles = [classes['card'], props.className];
	const cardText = `
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book`;

	return (
		<div className={styles.join(' ')}>
			<img alt='' src={url} className={classes['card__image']} />

			<section className={classes['card__description']}>
				<TextTruncate
					text={cardText}
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
						<span className={classes['card__icon-text']}>2 hours ago</span>
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
							500
						</span>
					</div>
				</div>

				<div className={classes['card__divider']}></div>

				<div className={classes['card__buttons']}>
					<div
						onClick={props.action}
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
