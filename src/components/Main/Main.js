import React, { useEffect } from 'react';
import Hero from './Hero/Hero';
import classes from './Main.module.css';
import Filters from './Filters/Filters';
import H2 from '../../UI/H2/H2';
import Card from './Card/Card';
import { connect } from 'react-redux';
import { toggleItemFav } from '../../store/actions';
import VisibilitySensor from '../VisibilitySensor/VisibilitySensor';
import { Spring, config } from 'react-spring/renderprops';

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
				<Spring
					from={{ opacity: 0 }}
					to={{ opacity: 1 }}
					config={{ friction: 26, tension: 30 }}
				>
					{animProps => (
						<H2 style={animProps} id='products'>
							filter products by categories
						</H2>
					)}
				</Spring>

				<Filters />
			</section>
			<section className={classes.card_container}>
				{props.items.map(item => (
					<VisibilitySensor key={item.itemId} once partialVisibility>
						{isVisible => (
							<Spring
								from={{
									opacity: 0,
									transform: 'translateY(50%)'
								}}
								to={{
									opacity: isVisible ? 1 : 0,
									transform: isVisible ? 'translateY(0)' : 'translateY(50%)'
								}}
								config={{ friction: 8, tension: 160 }}
							>
								{animProps => (
									<Card
										// key={item.itemId}
										style={animProps}
										id={item.itemId}
										url={item.mainUrl}
										timeStamp={item.timeStamp}
										itemPrice={item.itemPrice}
										itemName={item.itemName}
										isFav={item.isFav}
										infoClicked={() =>
											props.history.push(props.match.url + '/item-details')
										}
										toggleFavHandler={() =>
											props.toggleFav(item.itemId, props.userId, item.isFav)
										}
									/>
								)}
							</Spring>
						)}
					</VisibilitySensor>
				))}
			</section>

			{/* {props.items.map(item => (
					<Card
						key={item.itemId}
						id={item.itemId}
						url={item.mainUrl}
						timeStamp={item.timeStamp}
						itemPrice={item.itemPrice}
						itemName={item.itemName}
						isFav={item.isFav}
						infoClicked={() =>
							props.history.push(props.match.url + '/item-details')
						}
						toggleFavHandler={() =>
							props.toggleFav(item.itemId, props.userId, item.isFav)
						}
					/>
				))} */}
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
