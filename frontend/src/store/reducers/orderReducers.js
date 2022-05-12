import * as actionTypes from "../actions/actionTypes";
const initialState = {
	order: {},
	error: null,
	success: false,
};

const createOrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ORDER_CREATE_REQUEST:
			return {
				...state,
				success: false,
			};
		case actionTypes.ORDER_CREATE_SUCCESS:
			return {
				...state,
				order: action.payload,
				success: true,
			};
		case actionTypes.ORDER_CREATE_FAILURE:
			return {
				...state,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const orderDetailsReducer = (
	state = { order: {}, loading: true, error: null },
	action
) => {
	switch (action.type) {
		case actionTypes.ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ORDER_DETAILS_SUCCESS:
			return {
				...state,
				order: action.payload,
				loading: false,
			};
		case actionTypes.ORDER_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actionTypes.ORDER_DETAILS_RESET:
			return {
				...state,
				order: {},
				loading: true,
			};
		default:
			return state;
	}
};

const orderPayReducer = (
	state = { order: {}, loading: false, error: null },
	action
) => {
	switch (action.type) {
		case actionTypes.ORDER_PAY_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ORDER_PAY_SUCCESS:
			return {
				...state,
				order: action.payload,
				loading: false,
				success: true,
			};
		case actionTypes.ORDER_PAY_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actionTypes.ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

const orderDeliverReducer = (
	state = { order: {}, loading: false, error: null },
	action
) => {
	switch (action.type) {
		case actionTypes.ORDER_DELIVER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ORDER_DELIVER_SUCCESS:
			return {
				...state,
				order: action.payload,
				loading: false,
				success: true,
			};
		case actionTypes.ORDER_DELIVER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actionTypes.ORDER_DELIVER_RESET:
			return {};
		default:
			return state;
	}
};

const myOrdersReducer = (
	state = { orders: [], loading: false, error: null },
	action
) => {
	switch (action.type) {
		case actionTypes.MY_ORDERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.MY_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.payload,
				loading: false,
			};
		case actionTypes.MY_ORDERS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actionTypes.MY_ORDERS_LIST_RESET:
			return {
				orders: [],
			};
		default:
			return state;
	}
};

const ordersListReducer = (
	state = { orders: [], loading: false, error: null },
	action
) => {
	switch (action.type) {
		case actionTypes.ORDER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ORDER_LIST_SUCCESS:
			return {
				...state,
				orders: action.payload,
				loading: false,
			};
		case actionTypes.ORDER_LIST_FAILURE:
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
	createOrderReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	myOrdersReducer,
	ordersListReducer,
};
