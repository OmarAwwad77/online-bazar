import React, { useState, useEffect } from 'react';
import classes from './MyItems.module.css';
import Card from './Card/Card';
import Confirmation from '../../UI/Confirmation/Confirmation';
import { connect } from 'react-redux';
import { deleteItem, fetchMyItems } from '../../store/actions';

const MyItems = props => {
	const [showConfirmationState, setConfirmationState] = useState(false);
	const [itemState, setItemState] = useState({ itemId: null });
	useEffect(() => {
		// fetch data
		props.fetchMyItems(props.userId);
	}, []);

	const deleteAction = itemId => {
		setConfirmationState(!showConfirmationState);
		setItemState({ itemId });
	};

	const editAction = itemId => {
		props.history.push(`${props.match.url}/edit-item?itemId=${itemId}`);
	};

	const itemUrls = itemId => {
		const { extras, mainUrl } = props.myItems.find(
			item => item.itemId === itemId
		);
		return [...extras, mainUrl];
	};

	// props.deleteItem('osWm2rvQxqT4U3GkVyiB', [...extras, mainUrl]);
	return (
		<>
			{showConfirmationState && (
				<Confirmation
					message='are you sure you wanna delete this item'
					cancel={() => setConfirmationState(false)}
					action={() => {
						setConfirmationState(false);
						props.deleteItem(itemState.itemId, itemUrls(itemState.itemId));
					}}
				/>
			)}

			<section className={classes['my-items']}>
				<h2 className={classes['my-items__title']}>My Items</h2>
				<div className={classes['my-items__divider']} />
				<section className={classes['my-items__cards-container']}>
					{props.myItems.length === 0 ? (
						<p className={classes['my-items__no-items']}>(no items yet)</p>
					) : (
						props.myItems.map(item => (
							<Card
								key={item.itemId}
								id={item.itemId}
								itemDesc={item.itemDesc}
								timeStamp={item.timeStamp}
								itemPrice={item.itemPrice}
								mainUrl={item.mainUrl}
								className={classes['my-items__card']}
								actions={{
									delete: () => deleteAction(item.itemId),
									edit: () => editAction(item.itemId)
								}}
							/>
						))
					)}
				</section>
				<div className={classes['my-items__divider']} />
			</section>
		</>
	);
};

const mapDispatchToProps = dispatch => ({
	deleteItem: (id, urls) => dispatch(deleteItem(id, urls)),
	fetchMyItems: userId => dispatch(fetchMyItems(userId))
});

const mapStateToProps = ({ auth, items }) => ({
	myItems: items.myItems,
	userId: auth.user.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(MyItems);
