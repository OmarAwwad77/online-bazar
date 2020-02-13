import React, { useEffect, useState } from 'react';
import classes from './ItemDetails.module.css';
import TimeAgo from 'timeago-react';

const ItemDetails = props => {
	useEffect(() => {
		// fetch item by id
		// set item state
	}, []);
	const [animClassesState, setAnimClassesState] = useState({
		out: null,
		in: null,
		left: false
	});
	const urls = [
		'https://i.picsum.photos/id/240/400/300.jpg',
		'https://i.picsum.photos/id/241/400/300.jpg',
		'https://i.picsum.photos/id/249/400/300.jpg'
	];
	const arrowClicked = left => {
		let outIndex, inIndex, leftDir;

		if (!left) {
			leftDir = false;
			outIndex = animClassesState.out === null ? 0 : animClassesState.in;
			inIndex =
				animClassesState.in === null
					? 1
					: (animClassesState.in + 1) % urls.length;
		} else {
			leftDir = true;
			// outIndex =
			// 	animClassesState.out === null
			// 		? 0
			// 		: ((animClassesState.out - 1) % -urls.length) - 1;
			outIndex = animClassesState.out === null ? 0 : animClassesState.in;
			inIndex =
				animClassesState.in === null || outIndex === 0
					? urls.length - 1
					: animClassesState.in - 1;
		}

		setAnimClassesState({ in: inIndex, out: outIndex, left: leftDir });
	};

	return (
		<section className={classes['item-details']}>
			<div className={classes['item-details__slider']}>
				<span
					onClick={() => arrowClicked(true)}
					className={classes['slider__left-arrow']}
				></span>
				{urls.map((url, i) => {
					const styles = [classes['slider__img']];
					const dir = animClassesState.left ? '-left' : '-right';
					if (animClassesState.out === null && i === 0) {
						styles.push(classes['slider__img-default']);
					} else if (i === animClassesState.out) {
						styles.push(classes['move-out' + dir]);
					} else if (i === animClassesState.in) {
						styles.push(classes['move-in' + dir]);
					}
					return (
						<div
							key={i}
							className={styles.join(' ')}
							style={{ backgroundImage: `url(${url})` }}
						/>
					);
				})}
				<span
					onClick={() => arrowClicked(false)}
					className={classes['slider__right-arrow']}
				></span>
			</div>
			<h2 className={classes['item-details__item-name']}>macbook pro</h2>
			<div className={classes['item-details__price']}>
				<span className={classes['item-details__titles']}>product Price:</span>
			</div>
			<div className={classes['item-details__price-value']}>
				<span>
					650.50
					<span className={classes['item-details__dollar-sign']}>&#36;</span>
				</span>
			</div>
			<div className={classes['item-details__category']}>
				<span className={classes['item-details__titles']}>category:</span>
			</div>
			<div className={classes['item-details__category-value']}>
				<span>windows / laptop</span>
			</div>
			<div className={classes['item-details__time']}>
				<span className={classes['item-details__titles']}>uploaded:</span>
			</div>
			<TimeAgo
				className={classes['item-details__time-value']}
				datetime={Date.now()}
			/>
		</section>
	);
};

export default ItemDetails;
