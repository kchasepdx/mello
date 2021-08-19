import Axios from "axios";
import Cookies from "js-cookie";

import {
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
} from "../constants/productConstants";
import { deleteFromCart } from "./CartActions";

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: { product } });
    const {
      userLogin: { userInfo },
    } = getState();
    if (product._id === undefined) {
      const { data } = await Axios.post("/api/products/editproducts", product, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
          AdminUser: userInfo.isAdmin,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        "/api/products/editproducts/" + product._id,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
            AdminUser: userInfo.isAdmin,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST, payload: {} });
    const { data } = await Axios.get("/api/products/editproducts");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    let cookieData = JSON.stringify(data);
    Cookies.set("products", cookieData);
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: id });
    const { data } = await Axios.get("/api/products/" + id);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    let cookieData = JSON.stringify(data);
    Cookies.set("product", cookieData);
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

const setCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST, payload: category });
    const { data } = await Axios.get("/api/products/category/" + category);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
    let cookieData = JSON.stringify(data);
    Cookies.set("categoryList", cookieData);
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: error.message });
  }
};

const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id });
    const { data } = await Axios.put("/api/products/delete/" + id);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const updateInventory = (cartItems) => async (dispatch, getState) => {
  console.log("cart items to update: " + cartItems);
  try {
    dispatch({ type: UPDATE_INVENTORY_REQUEST, payload: cartItems });

    const newCounts = cartItems.map((x) => {
      return { ...x, countInStock: x.countInStock - x.qty };
    });
    console.log("newCounts Array: " + newCounts);

    const updateStock = newCounts.map((x) => {
      console.log("id to change: " + x.product);
      return Axios.put("/api/products/editproducts/" + x.product, x);
    });
    await Promise.all(updateStock);
    dispatch({ type: UPDATE_INVENTORY_SUCCESS, payload: updateStock });
    cartItems.forEach((x) => dispatch(deleteFromCart(x)));
    Cookies.set("cartItems", []);
    console.log(cartItems);
  } catch (error) {
    dispatch({ type: UPDATE_INVENTORY_FAIL, paylod: error.message });
    console.log(error);
  }
};

export {
  saveProduct,
  getProducts,
  getProductDetail,
  setCategory,
  deleteProduct,
  updateInventory,
};
