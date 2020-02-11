import * as actionTypes from './actionTypes';
import { db, storage } from '../../config/configfb';

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
