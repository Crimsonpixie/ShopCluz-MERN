import * as actionTypes from "../actions/actionTypes";

const initialState = {
	product: { reviews: [] },
	loading: false,
	error: null,
};

const productDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				product: action.payload,
			};
		case actionTypes.PRODUCT_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actionTypes.PRODUCT_DETAILS_RESET:
			return {};
		default:
			return state;
	}
};

const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_DELETE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.PRODUCT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case actionTypes.PRODUCT_DELETE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_CREATE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.PRODUCT_CREATE_SUCCESS:
			return {
				product: action.payload,
				loading: false,
				success: true,
			};
		case actionTypes.PRODUCT_CREATE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

const productCreateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case actionTypes.PRODUCT_CREATE_REVIEW_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_UPDATE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.PRODUCT_UPDATE_SUCCESS:
			return {
				product: action.payload,
				loading: false,
				success: true,
			};
		case actionTypes.PRODUCT_UPDATE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.PRODUCT_UPDATE_RESET:
			return { product: {} };
		default:
			return state;
	}
};

const productTopReducer = (state = {products:[]}, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_TOP_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PRODUCT_TOP_SUCCESS:
			return {
				...state,
				products: action.payload,
				loading: false,
			};
		case actionTypes.PRODUCT_TOP_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export {
	productDeleteReducer,
	productDetailsReducer,
	productCreateReducer,
	productUpdateReducer,
	productCreateReviewReducer,
	productTopReducer
};
