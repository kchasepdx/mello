/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { Route, BrowserRouter, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import StoreFront from "./screens/StoreFront";
import ProductDetail from "./screens/ProductDetail";
import CartScreen from "./screens/CartScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import dotenv from "dotenv";
import EditProductsScreen from "./screens/CreateProducts";
import { setCategory } from "./actions/ProductActions";
import SuccessScreen from "./screens/SuccessScreen";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const checkout = useSelector((state) => state.checkout);
  const { loading, success: checkedOut } = checkout;
  const { cartItems } = cart;
  const { userInfo } = userLogin;
  dotenv.config();

  function changeCategory(event) {
    console.log("event value = " + event.target.value);
    dispatch(setCategory(event.target.value));
  }

  const itemsInCart = cartItems
    .map((x) => {
      return x.qty;
    })
    .reduce(function (x, y) {
      return x + y;
    }, 0);

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand nav-mello" href="/">
            <i className="fas fa-fire"></i>mello
          </a>
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
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItems.length > 0 && (
                    <sup id="cart-count"> {itemsInCart} </sup>
                  )}
                </Link>
              </li>
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
              </li>
              {userInfo ? (
                <li className="nav-item">
                  <p className="nav-link">{userInfo.name}</p>
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

        <main>
          <div>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/storefront" component={StoreFront} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/checkout" component={PlaceOrderScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/editproducts" component={EditProductsScreen} />
            <Route path="/success" component={SuccessScreen} />
            <Route path="/cancel" component={CartScreen} />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

//
