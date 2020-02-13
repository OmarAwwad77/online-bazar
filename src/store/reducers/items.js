import * as actionTypes from '../actions/actionTypes';

const initialState = {
	favorites: [],
	queryItems: [{ itemId: 'npBZh2np7hz7tQjZSkDE', isFav: false }],
	myItems: [],
	error: null,
	loading: false
};

const removeItem = (arr, id) => arr.filter(item => item.itemId !== id);
const addItem = (arr, item) => [...arr, item];
const updateMyItems = (itemId, item, arr) => {
	const newArr = removeItem(arr, itemId);
	newArr.push({ ...item, itemId });
	return newArr;
};

const updateQueryItemsFav = (itemId, items, remove, queryItems = true) => {
	if (queryItems) {
		const updatedItem = {
			...items.find(item => item.itemId === itemId),
			isFav: remove ? false : true
		};
		const newArr = items.filter(item => item.itemId !== itemId);
		newArr.push(updatedItem);
		return newArr;
	} else {
		return removeItem(items, itemId);
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCHING_FAVORITES:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.FETCH_FAVORITES:
			return {
				...state,
				loading: false,
				favorites: action.payload.favorites
			};

		case actionTypes.FETCH_FAVORITES_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.FAVORITE_ITEM:
			return {
				...state,
				queryItems: updateQueryItemsFav(
					action.payload.itemId,
					state.queryItems,
					false
				)
			};

		case actionTypes.UNFAVORITE_ITEM:
			return {
				...state,
				favorites: updateQueryItemsFav(
					action.payload.itemId,
					state.favorites,
					true,
					false
				),
				queryItems: updateQueryItemsFav(
					action.payload.itemId,
					state.queryItems,
					true
				)
			};

		case actionTypes.FETCHING_MY_ITEMS:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.FETCH_MY_ITEMS:
			return {
				...state,
				loading: false,
				myItems: action.payload.myItems
			};

		case actionTypes.FETCH_MY_ITEMS_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.DELETING_ITEM:
			return {
				...state,
				error: null,
				loading: true
			};

		case actionTypes.UPDATING_ITEM:
			return {
				...state,
				error: null,
				loading: true
			};

		case actionTypes.UPDATE_ITEM_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.UPDATE_ITEM:
			return {
				...state,
				loading: false,
				myItems: updateMyItems(
					action.payload.itemId,
					action.payload.item,
					state.myItems
				)
			};

		case actionTypes.DELETE_ITEM:
			return {
				...state,
				loading: false,
				myItems: removeItem(state.myItems, action.payload.id)
			};

		case actionTypes.DELETE_ITEM_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.ADD_ITEM:
			return {
				...state,
				myItems: addItem(state.myItems, action.payload.item)
			};

		default:
			return state;
	}
};
