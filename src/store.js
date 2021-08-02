// import Cookie from "js-cookie";
import Cookies from "js-cookie";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/CartReducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({ cart: cartReducer });
const cartItems = JSON.parse(Cookies.get("cartItems")) || [];
const initialState = {
  cart: { cartItems },
};

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
