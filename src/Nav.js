/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dotenv from "dotenv";
import { setCategory } from "./actions/ProductActions";
import { deleteFromCart } from "./actions/CartActions";
import { logout } from "./actions/UserActions";

function Nav() {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = userLogin;
  dotenv.config();

  function changeCategory(event) {
    console.log("event value = " + event.target.value);
    dispatch(setCategory(event.target.value));
  }

  const itemsInCart = cartItems
    .map((x) => Number(x.qty))
    .reduce(function (x, y) {
      return (x += y);
    }, 0);

  console.log(cartItems);
  console.log({ cartItems });

  const subtotal = cartItems
    .map((x) => x.price * x.qty)
    .reduce(function (x, y) {
      return (x += y);
    }, 0);

  function removeFromCart(item) {
    dispatch(deleteFromCart(item));
  }

  function handleClick(userInfo) {
    dispatch(logout());
  }

  return (
    <div>
      <nav
        id="nav-bar-id"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <Link className="navbar-brand nav-mello" href="/">
          <i className="fas fa-fire"></i>mello
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <i className="fas fa-home"></i>{" "}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            {/* shopping cart  */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/cart"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length > 0 && (
                  <sup id="cart-count"> {itemsInCart} </sup>
                )}
              </Link>
              {cartItems.length > 0 ? (
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {cartItems.map((x) => {
                    return (
                      <li key={x.id} className="dropdown-item">
                        <span>
                          <img id="nav-img" src={x.image} alt="item"></img>
                        </span>
                        <span id="cart-item-name">{x.name}</span>
                        <span id="cart-item-quantity">Qty: {x.qty}</span>
                        <span id="cart-item-price">${x.price}</span>
                        <button
                          className="del-btn"
                          onClick={() => removeFromCart(x)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </li>
                    );
                  })}
                  <li className="dropdown-item">
                    <div className="subtotal-nav detail-submit">
                      Subtotal: ${subtotal.toFixed(2)}
                    </div>
                  </li>
                  <li className="dropdown-item nav-cart-links">
                    <Link to="/cart">
                      <button className="btn btn-primary item-btn detail-submit">
                        <i className="fas fa-shopping-cart"></i> Cart
                      </button>
                    </Link>
                    <Link to="/checkout">
                      <button className="btn btn-secondary chk-btn detail-submit">
                        <i className="far fa-credit-card"></i> Checkout
                      </button>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>Nothing in cart.</li>
                </ul>
              )}
            </li>

            {/* Products */}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-tshirt"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="/storefront">
                    <button
                      className="dropdown-item"
                      onClick={changeCategory}
                      value="{}"
                    >
                      all products
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/storefront">
                    <button
                      className="dropdown-item"
                      onClick={changeCategory}
                      id="hoodie"
                      value="hoodie"
                    >
                      hoodies
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/storefront">
                    <button
                      className="dropdown-item"
                      onClick={changeCategory}
                      id="beanie"
                      value="beanie"
                    >
                      beanies
                    </button>
                  </Link>
                </li>
              </ul>
              {/* USER INFO */}
            </li>
            {userInfo ? (
              <li className="nav-item">
                <p className="nav-link">{userInfo.name}</p>
                <button
                  className="btn btn-primary logout-btn detail-submit"
                  onClick={handleClick}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {userInfo && userInfo.isAdmin === true ? (
              <Link className="nav-item" to="/editproducts">
                <p className="nav-link">Edit Products</p>
              </Link>
            ) : null}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

//
