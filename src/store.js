// import Cookie from "js-cookie";
import Cookies from "js-cookie";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { cartReducer, cartCheckoutReducer } from "./reducers/CartReducers";
import {
  productCategoryReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productSaveReducer,
  productInvetoryUpdateReducer,
} from "./reducers/ProductReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/UserReducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
  cart: cartReducer,
  userRegister: userRegisterReducer,
  checkout: cartCheckoutReducer,
  userLogin: userLoginReducer,
  editProducts: productSaveReducer,
  listProducts: productListReducer,
  deleteProductFromDB: productDeleteReducer,
  productDetail: productDetailReducer,
  setCategory: productCategoryReducer,
  inventoryUpdate: productInvetoryUpdateReducer,
});

const userInfo =
  (Cookies.get("userInfo") && JSON.parse(Cookies.get("userInfo"))) || [];
const cartItems =
  (Cookies.get("cartItems") && JSON.parse(Cookies.get("cartItems"))) || [];
const products =
  (Cookies.get("products") && JSON.parse(Cookies.get("products"))) || [];
const product =
  (Cookies.get("product") && JSON.parse(Cookies.get("product"))) || [];
const categoryList =
  (Cookies.get("categoryList") && JSON.parse(Cookies.get("categoryList"))) ||
  [];
const checkoutStatus =
  (Cookies.get("checkoutStatus") &&
    JSON.parse(Cookies.get("checkoutStatus"))) ||
  [];

const initialState = {
  cart: { cartItems },
  userLogin: { userInfo },
  products: { products },
  product: { product },
  categoryList: { categoryList },
  checkout: { checkoutStatus },
};

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
