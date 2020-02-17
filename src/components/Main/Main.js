import React, { useEffect } from 'react';
import Hero from './Hero/Hero';
import classes from './Main.module.css';
import Filters from './Filters/Filters';
import H2 from '../../UI/H2/H2';
import Card from './Card/Card';
import { connect } from 'react-redux';
import { toggleItemFav } from '../../store/actions';
import { db } from '../../config/configfb';

const Main = props => {
	// useEffect(() => {
	// 	if (props.uerId) {
	// 		db.collection('users')
	// 			.doc(props.userId)
	// 			.get()
	// 			.then(doc => {
	// 				if (doc.exists) {
	// 					console.log(doc.data().favorites);
	// 				} else {
	// 					console.log(`doesn't exists`);
	// 				}
	// 			})
	// 			.catch(error => {
	// 				console.log('error', error);
	// 			});
	// 	}
	// }, []);

	return (
		<div className={classes.main}>
			<Hero auth={props.userId} />
			<section className={classes.filters_container}>
				<H2 id='products'>filter products by categories</H2>
				<Filters />
			</section>
			<section className={classes.card_container}>
				{props.items.map(item => (
					<Card
						key={item.itemId}
						id={item.itemId}
						toggleFavHandler={() =>
							props.toggleFav(item.itemId, props.userId, item.isFav)
						}
						isFav={item.isFav}
					/>
				))}
			</section>
		</div>
	);
};

const mapDispatchToProp = dispatch => ({
	toggleFav: (itemId, userId, remove) =>
		dispatch(toggleItemFav(itemId, userId, remove))
});

const mapStateToProps = ({ items, auth }) => ({
	items: items.queryItems,
	userId: auth.user && auth.user.uid
});

export default connect(mapStateToProps, mapDispatchToProp)(Main);
