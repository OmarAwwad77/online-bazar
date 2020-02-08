import * as actionTypes from '../actions/actionTypes';

const initialState = {
	favorites: [],
	myItems: [],
	error: null,
	loading: false
};

const removeItem = (arr, id) => arr.filter(item => item.id !== id);
const addItem = (arr, item) => [...arr, item];

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DELETE_ITEM_START:
			return {
				...state,
				error: null,
				loading: true
			};

		case actionTypes.DELETE_ITEM:
			return {
				...state,
				loading: false,
				myItems: removeItem(state.myItems, action.payload.id)
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
