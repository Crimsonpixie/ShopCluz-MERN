import * as actionTypes from "../actions/actionTypes";
const initialState = {
	order: {},
	error: null,
    success:false
};

const createOrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ORDER_CREATE_REQUEST:
			return {
				...state,
				success:false,
			};
		case actionTypes.ORDER_CREATE_SUCCESS:
			return {
				...state,
				order: action.payload,
                success:true
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


const orderDetailsReducer=(state={order:{},loading:true,error:null},action)=>{
    switch (action.type) {
		case actionTypes.ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading:true,
			};
		case actionTypes.ORDER_DETAILS_SUCCESS:
			return {
				...state,
				order: action.payload,
                loading:false
			};
		case actionTypes.ORDER_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}


export {createOrderReducer,orderDetailsReducer};