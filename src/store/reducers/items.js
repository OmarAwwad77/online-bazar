import * as actionTypes from '../actions/actionTypes';

const initialState = {
	favorites: null,
	toolbarQuery: {
		category: 'Laptops',
		subCategory: 'All SubCategories',
		ascending: 'Sort By Price: Low to High'
	},
	queryItems: null,
	myItems: null,
	error: null,
	loading: false,
	redirect: false
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
		case actionTypes.ADD_ITEM:
			return {
				...state,
				loading: false,
				error: null,
				redirect: true
			};

		case actionTypes.ADDING_ITEM:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.ADD_ITEM_FAILED:
			console.log(action.payload);
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.SET_TOOLBAR_QUERY:
			return {
				...state,
				toolbarQuery: action.payload.toolbarQuery
			};

		case actionTypes.QUERYING_ITEMS:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.QUERY_ITEMS:
			return {
				...state,
				loading: false,
				queryItems: action.payload.queryItems
			};

		case actionTypes.QUERY_ITEMS_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

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
					state.favorites ? state.favorites : [],
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

		case actionTypes.CLEAR_ITEMS_ERROR:
			return {
				...state,
				error: null
			};

		case actionTypes.SET_SHOULD_REDIRECT:
			return {
				...state,
				redirect: false
			};

		case actionTypes.RESET_REDIRECT:
			return {
				...state,
				redirect: false
			};

		case actionTypes.CLEAR_MY_ITEMS:
			return {
				...state,
				myItems: null
			};

		// case actionTypes.ADD_ITEM:
		// 	return {
		// 		...state,
		// 		myItems: addItem(state.myItems, action.payload.item)
		// 	};

		default:
			return state;
	}
};
