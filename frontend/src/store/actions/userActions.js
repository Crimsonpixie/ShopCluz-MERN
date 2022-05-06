import * as actionTypes from "./actionTypes.js";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.USER_LOGIN_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"/api/users/login",
			{ email, password },
			config
		);
		dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.USER_LOGIN_FAILURE,
			payload,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: actionTypes.USER_LOGOUT });
	dispatch({ type: actionTypes.USER_REGISTER_LOGOUT });
	dispatch({ type: actionTypes.USER_LIST_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.USER_REGISTER_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"/api/users",
			{ name, email, password },
			config
		);
		dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.USER_REGISTER_FAILURE,
			payload,
		});
	}
};

export const userProfile = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_DETAILS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/users/${id}`, config);
		dispatch({ type: actionTypes.USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.USER_DETAILS_FAILURE,
			payload,
		});
	}
};
export const updateProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_UPDATE_PROFILE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(`/api/users/profile`, user, config);
		dispatch({ type: actionTypes.USER_UPDATE_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.USER_UPDATE_PROFILE_FAILURE,
			payload,
		});
	}
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_LIST_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/users`, config);
		dispatch({ type: actionTypes.USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.USER_LIST_FAILURE,
			payload,
		});
	}
};

export const removeUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_REMOVE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.delete(`/api/users/${id}`, config);
		dispatch({ type: actionTypes.USER_REMOVE_SUCCESS });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.USER_REMOVE_FAILURE,
			payload,
		});
	}
};
