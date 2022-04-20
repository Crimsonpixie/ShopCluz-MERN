import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductListReducer from "./reducers/ProductListReducer.js";
import ProductDetailsReducer from "./reducers/ProductDetailsReducer.js";
import CartReducer from "./reducers/CartActionsReducer";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const reducer = combineReducers({
	productList: ProductListReducer,
	productDetails: ProductDetailsReducer,
	cart: CartReducer,
});

const initialState = {
	cart: { cartItems: cartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
