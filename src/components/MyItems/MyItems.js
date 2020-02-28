import React, { useState, useEffect } from 'react';
import classes from './MyItems.module.css';
import Card from './Card/Card';
import Confirmation from '../../UI/Confirmation/Confirmation';
import { connect } from 'react-redux';
import { deleteItem, fetchMyItems, clearItemsError } from '../../store/actions';
import Page from '../../UI/Page/Page';
import { useTransition, animated, useTrail } from 'react-spring';
import Spinner from '../../UI/Spinner/Spinner';
import { Route, Switch, useLocation } from 'react-router-dom';
import AddItem from '../AddItem/AddItem';
import withErrorModel from '../Model/withErrorModel';

const AnimatedCards = ({ items, editAction, deleteAction }) => {
	const config = { mass: 1, tension: 180, friction: 12 };
	const transition = useTransition(items, item => item.itemId, {
		from: { transform: `translateY(50%)` },
		enter: { transform: `translateY(0)` },
		leave: { transform: `translateY(50%)` }
	});

	const trails = useTrail(items.length, {
		from: { width: 80 },
		config,
		to: { width: 100 }
	});

	console.log(trails.length === transition.length);
	console.log('trails', trails);
	console.log('transition', transition);

	return transition.map(({ item, key, props }, index) => (
		<animated.div key={key} style={{ ...props, margin: '2rem 1rem' }}>
			{item.itemId !== 'noItems' ? (
				<animated.div
					style={{
						width: trails[index]
							? trails[index].width.interpolate(width => `${width}%`)
							: '100%'
					}}
				>
					<Card
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
				</animated.div>
			) : (
				<div style={{ textAlign: 'center' }}>No Items</div>
			)}
		</animated.div>
	));
};

const AnimatedRoute = props => {
	const transition = useTransition(
		props.location,
		location => location.pathname,
		{ from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 } }
	);

	return transition.map(({ item, key, props: animProps }) => (
		<animated.div key={key} style={animProps}>
			<Switch location={item}>
				<Route
					render={props => <AddItem {...props} withModel={true} />}
					path='/:path/edit-item/:itemId'
				/>
			</Switch>
		</animated.div>
	));
};

const MyItems = props => {
	const [showConfirmationState, setConfirmationState] = useState(false);
	const [itemState, setItemState] = useState({ itemId: null });
	console.log('my-items');
	useEffect(() => {
		// fetch data
		props.userId && props.fetchMyItems(props.userId);
	}, [props.userId]);

	const deleteAction = itemId => {
		setConfirmationState(!showConfirmationState);
		setItemState({ itemId });
	};

	const editAction = itemId => {
		props.history.push(
			`/${props.match.url.replace(/\//g, '')}/edit-item/${itemId}`
		);
		console.log(`/${props.match.url.replace(/\//g, '')}/edit-item/${itemId}`);
	};

	const itemUrls = itemId => {
		const { extras, mainUrl } = props.myItems.find(
			item => item.itemId === itemId
		);
		return [...extras, mainUrl];
	};

	const location = useLocation();

	let content = null;
	if (props.myItems) {
		content =
			props.myItems && props.myItems.length !== 0 ? (
				<>
					<AnimatedCards
						items={props.myItems}
						editAction={editAction}
						deleteAction={deleteAction}
					/>

					<AnimatedRoute location={location} />
				</>
			) : (
				<AnimatedCards items={[{ itemId: 'noItems' }]} />
			);
	} else {
		content = <Spinner />;
	}

	return (
		<>
			<Confirmation
				show={showConfirmationState}
				message='are you sure you wanna delete this item'
				cancel={() => setConfirmationState(false)}
				action={() => {
					setConfirmationState(false);
					props.deleteItem(itemState.itemId, itemUrls(itemState.itemId));
				}}
			/>
			<Page
				title='MY Items'
				contentClassName={classes['Page__content-container']}
			>
				{content}
			</Page>
		</>
	);
};

const mapDispatchToProps = dispatch => ({
	deleteItem: (id, urls) => dispatch(deleteItem(id, urls)),
	fetchMyItems: userId => dispatch(fetchMyItems(userId)),
	clearItemsError: () => dispatch(clearItemsError())
});

const mapStateToProps = ({ auth, items }) => ({
	myItems: items.myItems,
	userId: auth.user && auth.user.uid,
	hasError: items.error ? true : false
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorModel(MyItems));
