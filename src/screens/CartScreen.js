import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/CartActions";
import data from "../data";

function CartScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const id = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const currentProduct = data.products.filter((x) => x._id === id);
  const [newQty, setNewQty] = useState(0);

  useEffect(() => {
    if (currentProduct) {
      dispatch(addToCart(currentProduct, qty));
    }
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
      <h1 className="page-header">Cart</h1>
      <div className="cart-screen">
        <div className="cart-items">
          {cartItems.map((x) => {
            return (
              <div key={x._id} className="col-10 card cart-card">
                <img
                  className="card-img-top cart-img"
                  src={x.image}
                  alt="item"
                />
                <div className="card-body cart-card-body">
                  <h5 className="cart-card-title ">
                    <a className="cart-title" href={"/product" + x._id}>
                      {x.name}
                    </a>
                  </h5>
                  <p className="card-text">${x.price}</p>
                  <label>Quantity:</label>
                  <select
                    onChange={(e) => setNewQty(e.target.value)}
                    value={x.qty}
                  >
                    {[...Array(x.countInStock).keys()].map((y) => (
                      <option type="number" className="detail-qty" key={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <a
                    href={"/product" + x._id}
                    className="btn btn-primary del-btn"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div id="order-sum">
          <h1>SubTotal</h1>
          <table>
            <tr>
              <td>${subtotal}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
