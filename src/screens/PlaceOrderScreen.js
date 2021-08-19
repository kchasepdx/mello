import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, sliceCheckout } from "../actions/CartActions";
import data from "../data";

function PlaceOrderScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = cartItems
    .map((x) => x.price * x.qty)
    .reduce(function (x, y) {
      return x + y;
    }, 0);

  const tax = subtotal * 0.15;

  let total = subtotal;
  if (subtotal >= 100) {
    total = subtotal + tax;
  } else {
    total = subtotal + 15 + tax;
  }

  function handleClick() {
    dispatch(sliceCheckout(cartItems));
  }

  return (
    <div>
      <h1 className="page-header">Order Summary</h1>
      <a className="btn" href="/cart">
        Return to Cart
      </a>

      <div id="checkout-sum">
        <table className="table">
          <tr>
            <td>SubTotal:</td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td>{subtotal >= 100 ? "FREE" : "$10"}</td>
          </tr>
          <tr>
            <td>Taxes:</td>
            <td>${tax}</td>
          </tr>
          <tr className="total-row">
            <td>Total:</td>
            <td>${total}</td>
          </tr>
        </table>

        <button onClick={handleClick} className="btn">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
