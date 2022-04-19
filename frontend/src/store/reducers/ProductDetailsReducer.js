import * as actionTypes from "../actions/actionTypes";

const initialState = {
	product: {reviews:[]},
	loading: false,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
                loading:false,
				product: action.payload,
			};
		case actionTypes.PRODUCT_DETAILS_FAILURE:
			return {
				...state,
                loading:false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
