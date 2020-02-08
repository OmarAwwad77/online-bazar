import React, { useState } from 'react';
import classes from './MyItems.module.css';
import Card from './Card/Card';
import Confirmation from '../../UI/Confirmation/Confirmation';
import { connect } from 'react-redux';
import { deleteItem } from '../../store/actions';

const MyItems = props => {
	const [showConfirmationState, setConfirmationState] = useState(false);
	const [itemState, setItemState] = useState({ id: null, delete: false });

	const deleteAction = id => {
		setConfirmationState(!showConfirmationState);
		setItemState({ id, delete: false });
	};
	const id = 1;

	itemState.delete && props.deleteItem(itemState.id);

	return (
		<>
			{showConfirmationState && (
				<Confirmation
					message='are you sure you wanna delete this item'
					cancel={() => setConfirmationState(false)}
					action={() => {
						setConfirmationState(false);
						setItemState({ ...itemState, delete: true });
					}}
				/>
			)}

			<section className={classes['my-items']}>
				<h2 className={classes['my-items__title']}>My Items</h2>
				<div className={classes['my-items__divider']} />
				<section className={classes['my-items__cards-container']}>
					<Card
						id={id}
						actions={{ delete: () => deleteAction(id), edit: '' }}
						className={classes['my-items__card']}
					/>
				</section>
				<div className={classes['my-items__divider']} />
			</section>
		</>
	);
};

const mapDispatchToProps = dispatch => ({
	deleteItem: id => dispatch(deleteItem(id))
});

export default connect(null, mapDispatchToProps)(MyItems);
