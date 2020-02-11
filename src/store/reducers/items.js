import * as actionTypes from '../actions/actionTypes';

const initialState = {
	favorites: [],
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

export default (state = initialState, action) => {
	switch (action.type) {
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
