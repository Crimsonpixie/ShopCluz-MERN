import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductListReducer from "./reducers/ProductListReducer.js";
import ProductDetailsReducer from "./reducers/ProductDetailsReducer.js";
import CartReducer from "./reducers/CartActionsReducer";
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer} from "./reducers/userReducers.js";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;
const reducer = combineReducers({
	productList: ProductListReducer,
	productDetails: ProductDetailsReducer,
	cart: CartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails:userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer
});

const initialState = {
	cart: { cartItems: cartItemsFromLocalStorage },
	userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
