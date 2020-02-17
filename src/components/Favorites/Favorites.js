import React, { useEffect } from 'react';
import classes from './Favorites.module.css';
import Page from '../../UI/Page/Page';
import { connect } from 'react-redux';
import Card from '../Main/Card/Card';
import { fetchFavorites, toggleItemFav } from '../../store/actions';

const Favorites = props => {
	useEffect(() => {
		props.fetchFavorites(props.userId);
	}, []);

	console.log('RENDERING');

	let content =
		props.favorites.length !== 0 ? (
			props.favorites.map(item => (
				<Card
					key={item.itemId}
					id={item.itemId}
					url={item.mainUrl}
					timeStamp={item.timeStamp}
					itemPrice={item.itemPrice}
					itemName={item.itemName}
					isFav
					infoClicked={() =>
						props.history.push(props.match.url + '/item-details')
					}
					toggleFavHandler={() =>
						props.toggleFav(item.itemId, props.userId, true)
					}
				/>
			))
		) : (
			<p className={classes['Favorites__no-items']}>
				you have no favorite items yet
			</p>
		);
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
	userId: auth.user.uid
});

const mapDispatchToProps = dispatch => ({
	fetchFavorites: userId => dispatch(fetchFavorites(userId)),
	toggleFav: (itemId, userId, remove) =>
		dispatch(toggleItemFav(itemId, userId, remove))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
