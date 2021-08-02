import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/CartActions";
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
  console.log(subtotal);

  return (
    <div>
      <h1 className="page-header">Order Summary</h1>

      <div id="order-sum">
        <h1>Order Summary</h1>
        <table>
          <tr>
            <td>SubTotal</td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>{subtotal >= 100 ? "FREE" : "$10"}</td>
          </tr>
          <tr>
            <td>Taxes</td>
            <td>${subtotal} * .15</td>
          </tr>
          <tr>
            <td>Total</td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
