/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import StoreFront from "./screens/StoreFront";
import ProductDetail from "./screens/ProductDetail";
import CartScreen from "./screens/CartScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import EditProductsScreen from "./screens/CreateProducts";
import SuccessScreen from "./screens/SuccessScreen";
import Nav from "./Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
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
