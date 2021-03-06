import {
  CART_ADD_ITEM,
  CART_CHECKOUT_FAIL,
  CART_CHECKOUT_REQUEST,
  CART_CHECKOUT_SUCCESS,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from "../constants/cartConstants";

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.id === item.id);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.id === product.id ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.id !== action.payload.id),
      };

    case CART_UPDATE_ITEM:
      const updatedItem = action.payload;
      const updatedCartItems = state.cartItems.filter(
        (x) => x.id !== updatedItem.id
      );
      return {
        cartItems: [...updatedCartItems, updatedItem],
      };

    default:
      return state;
  }
}

function cartCheckoutReducer(state = { checkout: [] }, action) {
  switch (action.type) {
    case CART_CHECKOUT_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case CART_CHECKOUT_SUCCESS:
      return {
        loading: false,
        cartItems: [],
        success: true,
      };
    case CART_CHECKOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
}

export { cartReducer, cartCheckoutReducer };
