import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  deleteFromCart,
  updateIteminCart,
} from "../actions/CartActions";
import { getProductDetail } from "../actions/ProductActions";

function CartScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const id = props.match.params.id;
  const qty = props.location.search ? props.location.search.split("=")[1] : 1;
  const QTY = Number(qty);
  const productDetail = useSelector((state) => state.productDetail);
  const { product, error } = productDetail;

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }

    // ASYNC??
    if (id && product) {
      dispatch(addToCart(product, QTY));
      console.log("QTY type " + typeof QTY);
    } else {
      console.log("did not get product " + error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDelete(item) {
    dispatch(deleteFromCart(item));
  }

  const subtotal = cartItems
    .map((x) => x.price * x.qty)
    .reduce(function (x, y) {
      return x + y;
    }, 0);

  return (
    <div>
      <h1 className="page-header">Cart</h1>
      <div className="cart-screen">
        <div className="cart-items">
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="col-15 card cart-card">
                <img
                  className="card-img-top cart-img"
                  src={item.image}
                  alt="item"
                />
                <div className="card-body cart-card-body">
                  <h5 className="cart-card-title ">
                    <Link className="cart-title" to={"/product/" + item.id}>
                      {item.name}
                    </Link>
                  </h5>
                  <p className="card-text">${item.price}</p>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      type="number"
                      onChange={(e) => {
                        console.log("change", Number(e.target.value));
                        dispatch(
                          updateIteminCart(item, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((y) => (
                        <option
                          value={y + 1}
                          type="number"
                          className="detail-qty"
                          key={y + 1}
                        >
                          {y + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-primary del-btn"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div id="order-sum">
          <h1>SubTotal:</h1>

          <p id="subtotal">${subtotal.toFixed(2)}</p>

          <Link className="btn checkout-btn" to="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
