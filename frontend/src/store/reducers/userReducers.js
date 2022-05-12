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
		case actionTypes.USER_DETAILS_RESET:
			return {
				user: {},
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

const usersListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case actionTypes.USER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.USER_LIST_SUCCESS:
			return {
				...state,
				users: action.payload,
				loading: false,
			};
		case actionTypes.USER_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actionTypes.USER_LIST_RESET:
			return { users: [] };
		default:
			return state;
	}
};

const userRemoveReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_REMOVE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_REMOVE_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case actionTypes.USER_REMOVE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const userUpdateReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case actionTypes.USER_UPDATE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case actionTypes.USER_UPDATE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.USER_UPDATE_RESET:
			return {
				user: {},
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
	usersListReducer,
	userRemoveReducer,
	userUpdateReducer,
};
