import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductListReducer from "./reducers/ProductListReducer.js";
import {
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
} from "./reducers/ProductDetailsReducer.js";
import CartReducer from "./reducers/CartActionsReducer";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	usersListReducer,
	userRemoveReducer,
	userUpdateReducer,
} from "./reducers/userReducers.js";
import {
	createOrderReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrdersReducer,
	ordersListReducer,
	orderDeliverReducer
} from "./reducers/orderReducers";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: null;
const reducer = combineReducers({
	productList: ProductListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	cart: CartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: createOrderReducer,
	orderDetails: orderDetailsReducer,
	orderList: ordersListReducer,
	myOrders: myOrdersReducer,
	payOrder: orderPayReducer,
	deliverOrder:orderDeliverReducer,
	userList: usersListReducer,
	userRemove: userRemoveReducer,
	userUpdate: userUpdateReducer,
});

const initialState = {
	cart: {
		cartItems: cartItemsFromLocalStorage,
		shippingAddress: shippingAddressFromLocalStorage,
		paymentMethod: paymentMethodFromLocalStorage,
	},
	userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
