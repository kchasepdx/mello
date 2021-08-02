import logo from "./logo.svg";
import "./App.css";
import { Link, Route, BrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import StoreFront from "./screens/StoreFront";
import ProductDetail from "./screens/ProductDetail";
import CartScreen from "./screens/CartScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand nav-mello" href="#">
            <i class="fas fa-fire"></i>mello
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  <i class="fas fa-home"></i>{" "}
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fas fa-shopping-cart"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/storefront">
                  <i class="fas fa-tshirt"></i>
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                id="search-btn"
              >
                Search
              </button>
            </form>
          </div>
        </nav>

        <main>
          <div>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/storefront" exact={true} component={StoreFront} />
            <Route path="/product:id" exact={true} component={ProductDetail} />
            <Route path="/cart/:id" exact={true} component={CartScreen} />
            <Route path="/checkout" exact={true} component={PlaceOrderScreen} />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
