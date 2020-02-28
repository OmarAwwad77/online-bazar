import React, { useEffect } from 'react';
import classes from './Favorites.module.css';
import Page from '../../UI/Page/Page';
import { connect } from 'react-redux';
import Card from '../Main/Card/Card';
import { fetchFavorites, toggleItemFav } from '../../store/actions';
import { useTransition, animated } from 'react-spring';
import Spinner from '../../UI/Spinner/Spinner';
// import { useLocation } from 'react-router-dom';

// props.favorites.map(item => (
// 	<Card
// 		key={item.itemId}
// 		id={item.itemId}
// 		url={item.mainUrl}
// 		timeStamp={item.timeStamp}
// 		itemPrice={item.itemPrice}
// 		itemName={item.itemName}
// 		isFav
// 		infoClicked={() =>
// 			props.history.push(props.match.url + '/item-details')
// 		}
// 		toggleFavHandler={() =>
// 			props.toggleFav(item.itemId, props.userId, true)
// 		}
// 	/>
// ))

const AnimatedCards = ({ items, push, url, toggleFav, userId, getUrl }) => {
	const transitions = useTransition(items, item => item.itemId, {
		from: { transform: `translateY(50%)`, opacity: 0 },
		enter: { transform: `translateY(0)`, opacity: 1 },
		leave: { transform: `translateY(50%)`, opacity: 0 }
	});

	return transitions.map(({ item, props, key }) => (
		<animated.div key={key} style={props}>
			{item.itemId !== 'noItems' ? (
				<Card
					id={item.id}
					url={item.mainUrl}
					timeStamp={item.timeStamp}
					itemPrice={item.itemPrice}
					itemName={item.itemName}
					isFav
					infoClicked={() => push(getUrl(item.itemId))}
					toggleFavHandler={() => toggleFav(item.itemId, userId, true)}
				/>
			) : (
				<div
					style={{
						textTransform: 'capitalize',
						fontSize: '1.5rem'
					}}
				>
					you haven't added any items yet
				</div>
			)}
		</animated.div>
	));
};

const Favorites = props => {
	useEffect(() => {
		props.userId && props.fetchFavorites(props.userId);
	}, [props.userId]);
	const pathname = props.match.url;
	const getUrl = itemId =>
		`${pathname.replace(/\//g, '')}/item-details/${itemId}`;

	let content = null;

	if (props.favorites && !props.loading) {
		content =
			props.favorites.length !== 0 ? (
				<AnimatedCards
					items={props.favorites}
					push={props.history.push}
					url={props.match.url}
					toggleFav={props.toggleFav}
					userId={props.userId}
					getUrl={getUrl}
				/>
			) : (
				<AnimatedCards items={[{ itemId: 'noItems' }]} />
			);
	} else {
		content = <Spinner />;
	}

	return (
		<Page
			contentClassName={classes['Page__content-container']}
			title='Favorites'
		>
			{content}
		</Page>
	);
};

const mapStateToProps = ({ items, auth }) => ({
	favorites: items.favorites,
	userId: auth.user && auth.user.uid,
	loading: items.loading
});

const mapDispatchToProps = dispatch => ({
	fetchFavorites: userId => dispatch(fetchFavorites(userId)),
	toggleFav: (itemId, userId, remove) =>
		dispatch(toggleItemFav(itemId, userId, remove))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
