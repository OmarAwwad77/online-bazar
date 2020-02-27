import React, { useEffect, useState } from 'react';
import classes from './ItemDetails.module.css';
import TimeAgo from 'timeago-react';
import WithModelComponent from '../Model/WithModelComponent';
import { useParams } from 'react-router-dom';
import { db } from '../../config/configfb';
import Spinner from '../../UI/Spinner/Spinner';

const ItemDetails = props => {
	const [itemS, setItemS] = useState(null);
	const [animClassesState, setAnimClassesState] = useState({
		out: null,
		in: null,
		left: false
	});

	const { itemId } = useParams();
	useEffect(() => {
		db.collection('items')
			.doc(itemId)
			.get()
			.then(doc => {
				if (doc.exists) {
					setItemS({
						itemId: doc.id,
						urls: [doc.data().mainUrl, ...doc.data().extras],
						...doc.data()
					});
				}
			})
			.catch(err => console.log(err.message));
	}, []);

	const dummyText = `Lorem Ipsum is simply dummy text of the printing and typesetting
	industry. Lorem Ipsum has been the industry's standard dummy text ever
	since the 1500s, when an unknown printer took a galley of type and
	scrambled it to make a type specimen book. It has survived not only five
	centuries, but also the leap into electronic typesetting, remaining
	essentially unchanged. It was popularised in the 1960s with the release
	of Letraset sheets containing Lorem Ipsum passages, and more recently
	with desktop publishing software like Aldus PageMaker including versions
	of Lorem Ipsum`;

	const arrowClicked = left => {
		let outIndex, inIndex, leftDir;
		if (itemS.urls.length === 1) return;

		if (!left) {
			leftDir = false;
			outIndex = animClassesState.out === null ? 0 : animClassesState.in;
			inIndex =
				animClassesState.in === null
					? 1
					: (animClassesState.in + 1) % itemS.urls.length;
		} else {
			leftDir = true;
			// outIndex =
			// 	animClassesState.out === null
			// 		? 0
			// 		: ((animClassesState.out - 1) % -urls.length) - 1;
			outIndex = animClassesState.out === null ? 0 : animClassesState.in;
			inIndex =
				animClassesState.in === null || outIndex === 0
					? itemS.urls.length - 1
					: animClassesState.in - 1;
		}

		setAnimClassesState({ in: inIndex, out: outIndex, left: leftDir });
	};

	return (
		<WithModelComponent show modelClass={classes['model']} usingRouter>
			{close =>
				itemS ? (
					<section className={classes['item-details']}>
						<div className={classes['item-details__slider']}>
							<span
								style={{
									display: itemS.urls.length > 1 ? 'initial' : 'none'
								}}
								onClick={() => arrowClicked(true)}
								className={classes['slider__left-arrow']}
							></span>
							{itemS.urls.map((url, i) => {
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
								style={{
									display: itemS.urls.length > 1 ? 'initial' : 'none'
								}}
								onClick={() => arrowClicked(false)}
								className={classes['slider__right-arrow']}
							></span>
						</div>
						<h2 className={classes['item-details__item-name']}>
							{itemS.itemName}
						</h2>
						<div className={classes['item-details__price']}>
							<span className={classes['item-details__titles']}>
								product Price:
							</span>
						</div>
						<div className={classes['item-details__price-value']}>
							<span>
								{itemS.itemPrice}
								<span className={classes['item-details__dollar-sign']}>
									&#36;
								</span>
							</span>
						</div>
						<div className={classes['item-details__category']}>
							<span className={classes['item-details__titles']}>category:</span>
						</div>
						<div className={classes['item-details__category-value']}>
							<span>
								{itemS.mainCategory} / {itemS.subCategory}
							</span>
						</div>
						<div className={classes['item-details__time']}>
							<span className={classes['item-details__titles']}>uploaded:</span>
						</div>
						<TimeAgo
							className={classes['item-details__time-value']}
							datetime={itemS.timeStamp}
						/>
						<div className={classes['item-details__contact']}>
							<span className={classes['item-details__titles']}>
								owner's contact:
							</span>
						</div>
						<span className={classes['item-details__contact-value']}>
							{itemS.ownerContact}
						</span>
						<div className={classes['item-details__desc']}>
							<span className={classes['item-details__titles']}>
								Product Description:
							</span>
						</div>
						<span className={classes['item-details__desc-value']}>
							{itemS.itemDesc}
						</span>
					</section>
				) : (
					<Spinner />
				)
			}
		</WithModelComponent>
	);
};

export default ItemDetails;
