import * as actionTypes from "./actionTypes";
import axios from "axios";

export const createOrder = (orderObj) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_CREATE_REQUEST });
		console.log(orderObj);
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/orders`, orderObj, config);
		dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		console.log(payload);
		dispatch({
			type: actionTypes.ORDER_CREATE_FAILURE,
			payload,
		});
	}
};
export const getOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/orders/${id}`, config);
		dispatch({ type: actionTypes.ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.ORDER_DETAILS_FAILURE,
			payload,
		});
	}
};

export const payOrderAction =
	(id, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({ type: actionTypes.ORDER_PAY_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				"Content-Type": "application/json",
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/orders/${id}/pay`,
				paymentResult,
				config
			);
			dispatch({ type: actionTypes.ORDER_PAY_SUCCESS, payload: data });
		} catch (error) {
			const payload =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			dispatch({
				type: actionTypes.ORDER_PAY_FAILURE,
				payload,
			});
		}
	};

export const deliverOrderAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_DELIVER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);
		dispatch({ type: actionTypes.ORDER_DELIVER_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.ORDER_DELIVER_FAILURE,
			payload,
		});
	}
};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.MY_ORDERS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/orders/myorders`, config);
		dispatch({ type: actionTypes.MY_ORDERS_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.MY_ORDERS_FAILURE,
			payload,
		});
	}
};

export const listAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_LIST_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/orders`, config);
		dispatch({ type: actionTypes.ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.ORDER_LIST_FAILURE,
			payload,
		});
	}
};
