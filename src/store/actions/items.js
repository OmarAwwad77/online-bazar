import * as actionTypes from './actionTypes';
import { db } from '../../config/configfb';

export const addItem = () => {};

const deleteStart = () => ({ type: actionTypes.DELETE_ITEM_START });

const deleteItemSync = id => ({
	type: actionTypes.DELETE_ITEM,
	payload: { id }
});

export const deleteItem = id => {
	return async dispatch => {
		try {
			dispatch(deleteStart());
			await db
				.collection('items')
				.doc(id)
				.delete();
			dispatch(deleteItemSync(id));
		} catch (error) {
			console.log(error);
		}
	};
};
