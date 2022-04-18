import * as actionTypes from "../actions/actionTypes.js";

const initialState = {
	products: [],
	loading: false,
	error: null,
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PRODUCT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload,
			};
		case actionTypes.PRODUCT_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
