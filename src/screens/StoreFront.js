import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/CartActions";
import { getProducts } from "../actions/ProductActions";

function StoreFront(props) {
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.listProducts);
  const setCategory = useSelector((state) => state.setCategory);
  const { loading, products, error } = listProducts;
  const { categoryList } = setCategory;

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Display All Products or Hoodies or Beanies
  var currentCategory = "";
  if (categoryList === undefined) {
    currentCategory = undefined;
  } else if (categoryList.length === 0) {
    currentCategory = undefined;
  } else {
    currentCategory = categoryList[0].category;
  }

  // Log error getting products
  if (error) console.log(error);

  // Quick Add item to cart
  const quickAddToCart = (x) => {
    if (x.countInStock >= 1) {
      dispatch(addToCart(x, 1));
    } else {
      alert("Sorry, this item is out of stock");
    }
  };

  return (
    <div className="store-front">
      <h1 className="page-header">
        {" "}
        {currentCategory ? currentCategory + "s" : "everything"}
      </h1>

      {/* Item Added to Cart Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div id="modal-box-cart-add" className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Item Added to Cart!
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <i className="fas fa-window-close"></i>
              </button>
              <Link to="/cart">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </Link>
              <Link to="/checkout">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="far fa-credit-card"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Display by selected category */}
      {categoryList && categoryList.length > 0 ? (
        <div className="product-grid">
          {categoryList.map((x) => (
            <div key={x._id} className="col-sm-6 card">
              <Link to={"/product/" + x._id}>
                <img className="card-img-top" src={x.image} alt="item" />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={"/product/" + x._id}>{x.name}</Link>
                </h5>
                <p className="card-text">${x.price}</p>
                <Link
                  to={"/product/" + x._id}
                  className="btn btn-primary item-btn"
                >
                  Take a look.
                </Link>
                <button
                  className="btn btn-primary item-btn add-cart"
                  onClick={() => quickAddToCart(x)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : loading ? (
        <p>
          <i className="fas fa-spinner"></i>
        </p>
      ) : (
        {
          /* Display all products - no category selected */
        }(
          <div className="product-grid">
            {products &&
              products.map((x) => (
                <div key={x._id} className="col-sm-6 card">
                  <Link to={"/product/" + x._id}>
                    <img className="card-img-top" src={x.image} alt="item" />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={"/product" + x._id}>{x.name}</Link>
                    </h5>
                    <p className="card-text">${x.price}</p>
                    <Link
                      to={"/product/" + x._id}
                      className="btn btn-primary item-btn"
                    >
                      Take a look.
                    </Link>
                    <button
                      className="btn btn-primary item-btn add-cart"
                      onClick={() => quickAddToCart(x)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i className="fas fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )
      )}
    </div>
  );
}

export default StoreFront;
