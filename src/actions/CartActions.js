import { CART_ADD_ITEM } from "../constants/cartConstants";

const addToCart = (currentItem, qty) => async (dispatch, getState) => {
  try {
    const product = currentItem;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: product[0]._id,
        name: product[0].name,
        image: product[0].image,
        price: product[0].price,
        countInStock: product[0].countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
  } catch (error) {}
};

export { addToCart };
