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
		from: { width: 80, opacity: 1 },
		config,
		to: { width: 100, opacity: 1 }
	});

	return transition.map(({ item, key, props }, index) => (
		<animated.div key={key} style={{ ...props, margin: '2rem 1rem' }}>
			{item.itemId !== 'noItems' ? (
				<animated.div
					style={{
						opacity: trails[index].opacity,
						width: trails[index].width.interpolate(width => `${width}%`)
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
				<div>No Items</div>
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
	useEffect(() => {
		// fetch data
		props.fetchMyItems(props.userId);
	}, []);

	const deleteAction = itemId => {
		setConfirmationState(!showConfirmationState);
		setItemState({ itemId });
	};

	const editAction = itemId => {
		props.history.push(
			`/${props.match.url.replace(/\//g, '')}/edit-item/${itemId}`
		);

		// props.history.push('/my-items/edit-item');
	};

	const itemUrls = itemId => {
		const { extras, mainUrl } = props.myItems.find(
			item => item.itemId === itemId
		);
		return [...extras, mainUrl];
	};

	const location = useLocation();

	let content = null;
	if (props.myItems && !props.loading) {
		content =
			props.myItems.length !== 0 ? (
				<>
					<AnimatedCards
						items={props.myItems}
						editAction={editAction}
						deleteAction={deleteAction}
					/>

					<AnimatedRoute location={location} />
					{/* <AnimatedRoute
						render={props => <AddItem {...props} withModel={true} />}
						path='/:path/edit-item/:itemId'
						atEnter={{ opacity: 1, top: 50 }}
						atLeave={{ opacity: 0.5, to: -100 }}
						atActive={{ opacity: 1, top: 50 }}
						mapStyles={styles => ({
							opacity: `${styles.opacity}`,
							top: `${styles.top}%`
						})}
					/> */}
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

			{/* <AnimatedRoute
      path="/sidebar"
      component={Sidebar}
      atEnter={{ offset: -100 }}
      atLeave={{ offset: -100 }}
      atActive={{ offset: 0 }}
      mapStyles={(styles) => ({
        transform: `translateX(${styles.offset}%)`,
      })}
    /> */}
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
	userId: auth.user.uid,
	loading: items.loading,
	hasError: items.error ? true : false
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorModel(MyItems));
