import * as actionTypes from "../actions/actionTypes.js";

const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_LOGIN_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_LOGIN_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			};
		case actionTypes.USER_LOGIN_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_REGISTER_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_REGISTER_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			};
		case actionTypes.USER_REGISTER_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.USER_REGISTER_LOGOUT:
			return {};
		default:
			return state;
	}
};

const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case actionTypes.USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		case actionTypes.USER_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_UPDATE_PROFILE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				success: true,
				userInfo: action.payload,
			};
		case actionTypes.USER_UPDATE_PROFILE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
};
