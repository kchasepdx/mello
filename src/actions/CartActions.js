import Cookies from "js-cookie";
import Axios from "axios";
import dotenv from "dotenv";

import {
  CART_ADD_ITEM,
  CART_CHECKOUT_FAIL,
  CART_CHECKOUT_REQUEST,
  CART_CHECKOUT_SUCCESS,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from "../constants/cartConstants";

dotenv.config();
const serverURL = "https://mello-store-backend.herokuapp.com";

const addToCart = (currentItem, qty) => async (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();
  console.log("cartItems before " + JSON.stringify(cartItems));
  try {
    // const duplicate = await cartItems.find((x) => x.id === currentItem.id);
    const productInCart = await cartItems.filter(
      (x) => x.id === currentItem._id
    );
    console.log("currentItem " + JSON.stringify(currentItem));
    console.log("currentItem.id " + currentItem._id);
    console.log("productInCart: " + JSON.stringify(productInCart));
    console.log("productInCart type: " + typeof productInCart);
    console.log("current Item qty " + qty);

    if (productInCart && productInCart.length > 0) {
      const updatedProductQty = productInCart[0].qty + qty;
      console.log("productInCart qty:" + Number(productInCart[0].qty));
      dispatch(updateIteminCart(currentItem, updatedProductQty));
    } else {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          id: currentItem._id || currentItem.id,
          name: currentItem.name,
          image: currentItem.image,
          price: currentItem.price,
          countInStock: currentItem.countInStock,
          category: currentItem.category,
          brand: currentItem.brand,
          qty,
        },
      });
    }

    Cookies.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

const deleteFromCart = (currentItem) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: currentItem,
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookies.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

const updateIteminCart = (currentItem, qty) => async (dispatch, getState) => {
  try {
    const product = currentItem;
    dispatch({
      type: CART_UPDATE_ITEM,
      payload: {
        id: product._id || product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookies.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

const sliceCheckout = (cartItems) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_CHECKOUT_REQUEST,
      payload: cartItems,
    });
    console.log("process", process.env.development);
    console.log("key", process.env.REACT_APP_STRIPE_SECRET_TEST_KEY);

    const URL = await Axios.post(
      serverURL + "/api/checkout/create-checkout-session",
      cartItems,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + process.env.REACT_APP_STRIPE_SECRET_TEST_KEY,
        },
        body: cartItems,
      }
    );
    dispatch({
      type: CART_CHECKOUT_SUCCESS,
    });

    window.location.href = URL.data;
    Cookies.set("cartItems", []);
  } catch (error) {
    dispatch({ type: CART_CHECKOUT_FAIL, payload: error.message });
  }
};

export { addToCart, deleteFromCart, updateIteminCart, sliceCheckout };
