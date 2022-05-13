import * as actionTypes from "./actionTypes.js";
import axios from "axios";

export const listProducts =
	(keyword = "", pageNumber = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

			const { data } = await axios.get(
				`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
			);
			dispatch({ type: actionTypes.PRODUCT_LIST_SUCCESS, payload: data });
		} catch (error) {
			const payload =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			dispatch({
				type: actionTypes.PRODUCT_LIST_FAILURE,
				payload,
			});
		}
	};

export const listTopProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_TOP_REQUEST });

		const { data } = await axios.get(`/api/products/top`);
		dispatch({ type: actionTypes.PRODUCT_TOP_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: actionTypes.PRODUCT_TOP_FAILURE,
			payload,
		});
	}
};
