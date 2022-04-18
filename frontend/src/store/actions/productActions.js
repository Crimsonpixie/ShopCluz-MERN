import * as actionTypes from "./actionTypes.js";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

		const { data } = await axios.get("/api/products");
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
