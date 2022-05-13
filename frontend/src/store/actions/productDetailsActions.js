import * as actionTypes from "./actionTypes";
import axios from "axios";

export const productDetailsAction = (id) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({ type: actionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.PRODUCT_DETAILS_FAILURE,
			payload,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_DELETE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.delete(`/api/products/${id}`, config);
		dispatch({ type: actionTypes.PRODUCT_DELETE_SUCCESS });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.PRODUCT_DELETE_FAILURE,
			payload,
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_CREATE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/products`, {}, config);
		dispatch({ type: actionTypes.PRODUCT_CREATE_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.PRODUCT_CREATE_FAILURE,
			payload,
		});
	}
};

export const createProductReview = (id,review) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			"Content-Type": "application/json",
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/products/${id}/reviews`,review, config);
		dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.PRODUCT_CREATE_REVIEW_FAILURE,
			payload,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_UPDATE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			"Content-Type": "application/json",
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(`/api/products/${product._id}`,product, config);
		dispatch({ type: actionTypes.PRODUCT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.PRODUCT_UPDATE_FAILURE,
			payload,
		});
	}
};
