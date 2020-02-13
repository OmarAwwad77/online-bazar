import * as actionTypes from './actionTypes';
import { db, storage, addArray, removeArr } from '../../config/configfb';

export const addItem = () => {};

const fetchingMyItems = () => ({ type: actionTypes.FETCHING_MY_ITEMS });

const fetchMyItemsSync = myItems => ({
	type: actionTypes.FETCH_MY_ITEMS,
	payload: { myItems }
});

const fetchMyItemsFailed = error => ({
	type: actionTypes.FETCH_MY_ITEMS_FAILED,
	payload: { error }
});

export const fetchMyItems = userId => {
	return async dispatch => {
		dispatch(fetchingMyItems());
		try {
			const querySnapshot = await db
				.collection('items')
				.where('ownerUid', '==', userId)
				.get();
			const items = [];
			querySnapshot.forEach(doc => {
				const item = { ...doc.data(), itemId: doc.id };
				items.push(item);
				console.log(item);
			});
			dispatch(fetchMyItemsSync(items));
		} catch (error) {
			dispatch(fetchMyItemsFailed(error));
		}
	};
};

const fetchingFavorites = () => ({ type: actionTypes.FETCHING_FAVORITES });

const fetchFavoritesSync = favorites => ({
	type: actionTypes.FETCH_FAVORITES,
	payload: { favorites }
});

const fetchFavoritesFailed = error => ({
	type: actionTypes.FETCH_FAVORITES_FAILED,
	payload: { error }
});

export const fetchFavorites = userId => {
	return async dispatch => {
		dispatch(fetchingFavorites());
		const doc = await db
			.collection('users')
			.doc(userId)
			.get();
		if (doc.exists) {
			const promises = [];
			doc.data().favorites.forEach(itemId => {
				promises.push(
					db
						.collection('items')
						.doc(itemId)
						.get()
				);
			});
			Promise.all(promises)
				.then(items => {
					// if (!items[0].exists) {
					// 	return Promise.reject('item do not exist');
					// }
					const transformedItems = doc
						.data()
						.favorites.map((itemId, index) => ({
							...items[index].data(),
							itemId
						}));
					console.log('transformedItems', transformedItems);
					dispatch(fetchFavoritesSync(transformedItems));
				})
				.catch(error => {
					console.log('error', error);
					dispatch(fetchFavoritesFailed(error));
				});
		} else {
			dispatch(fetchFavoritesSync([]));
		}
	};
};

const deletingItem = () => ({ type: actionTypes.DELETING_ITEM });

const deleteItemSync = id => ({
	type: actionTypes.DELETE_ITEM,
	payload: { id }
});

const deleteItemFailed = error => ({
	type: actionTypes.DELETE_ITEM_FAILED,
	payload: { error }
});

export const deleteItem = (id, urls) => {
	return dispatch => {
		dispatch(deletingItem());
		const promises = [];
		const promise1 = db
			.collection('items')
			.doc(id)
			.delete();

		promises.push(promise1);

		urls.forEach(url => {
			console.log('url', url);
			const imgRef = storage.refFromURL(url);
			promises.push(imgRef.delete());
		});

		Promise.all(promises)
			.then(_ => dispatch(deleteItemSync(id)))
			.catch(error => dispatch(deleteItemFailed(error)));
	};
};

const updatingItem = () => ({ type: actionTypes.UPDATING_ITEM });

const updateItemSync = (itemId, item) => ({
	type: actionTypes.UPDATE_ITEM,
	payload: { item, itemId }
});

const updateItemFailed = error => ({
	type: actionTypes.UPDATE_ITEM_FAILED,
	payload: { error }
});

export const updateItem = (itemId, item) => {
	return async dispatch => {
		dispatch(updatingItem());
		try {
			await db
				.collection('items')
				.doc(itemId)
				.set(item);
			dispatch(updateItemSync(itemId, item));
		} catch (error) {
			dispatch(updateItemFailed(error));
		}
	};
};

const unFavoriteItem = itemId => ({
	type: actionTypes.UNFAVORITE_ITEM,
	payload: { itemId }
});

const FavoriteItem = itemId => ({
	type: actionTypes.FAVORITE_ITEM,
	payload: { itemId }
});

export const toggleItemFav = (itemId, userId, remove) => {
	return async dispatch => {
		try {
			if (remove) {
				dispatch(unFavoriteItem(itemId));
				await db
					.collection('users')
					.doc(userId)
					.set({
						favorites: removeArr(itemId)
					});
			} else {
				dispatch(FavoriteItem(itemId));
				await db
					.collection('users')
					.doc(userId)
					.set({
						favorites: addArray(itemId)
					});
			}
		} catch (error) {
			console.log('error', error);
		}
	};
};
