import * as actionTypes from "../actions/actionTypes.js";

const initialState = {
	userInfo: {},
	loading: false,
	error: null,
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USER_LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: action.payload,
			};
		case actionTypes.USER_LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actionTypes.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export default reducer;
