import * as actionTypes from "./actionTypes";
import axios from "axios";

export const productDetailsAction = (id) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/products/${id}`);
        console.log(data);
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
