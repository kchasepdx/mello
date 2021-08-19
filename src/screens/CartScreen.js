import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const productDetail = useSelector((state) => state.productDetail);
  const { product, error } = productDetail;

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }

    if (product) {
      dispatch(addToCart(product, qty));
    } else {
      console.log(error);
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
              <div key={item._id} className="col-15 card cart-card">
                <img
                  className="card-img-top cart-img"
                  src={item.image}
                  alt="item"
                />
                <div className="card-body cart-card-body">
                  <h5 className="cart-card-title ">
                    <a className="cart-title" href={"/product" + item._id}>
                      {item.name}
                    </a>
                  </h5>
                  <p className="card-text">${item.price}</p>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        console.log("change", e.target.value);
                        dispatch(updateIteminCart(item, e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((y) => (
                        <option
                          value={y + 1}
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

          <p id="subtotal">${subtotal}</p>

          <a className="btn checkout-btn" href="/checkout">
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
