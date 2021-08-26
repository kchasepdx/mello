/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductDetail } from "../actions/ProductActions";

function ProductDetail(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, error } = productDetail;
  const [qty, setQty] = useState(1);

  // Add item to cart and redirect to cart page
  function addToCart() {
    if (product.countInStock >= qty) {
      props.history.push("/cart/" + id + "?qty=" + qty);
    } else {
      alert("Sorry, this item is out of stock");
    }
  }

  // Log error getting product info
  if (error) console.log(error);

  // Get selected product information
  useEffect(() => {
    dispatch(getProductDetail(props.match.params.id));
  }, []);

  return (
    <div className="store-front">
      <Link to="/storefront">
        {" "}
        <i className="fas fa-long-arrow-alt-left"></i>Back to results...
      </Link>
      {loading && (
        <p>
          <i className="fas fa-spinner"></i>
        </p>
      )}
      {product && (
        <div>
          <h1 className="page-header">{product.name}</h1>
          <img className="card-img-top" src={product.image} alt="item" />
          <div className="card-body">
            <h5 className="card-title">{product.brand}</h5>
            <p className="card-text detail-price">${product.price}</p>
            <form className="form-group" onSubmit={addToCart}>
              {product.countInStock > 0 ? (
                <div id="qty-div">
                  <label>Quantity:</label>
                  <select onChange={(e) => setQty(e.target.value)} value={qty}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option className="detail-qty" key={x}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="btn btn-primary item-btn detail-submit"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary item-btn detail-submit">
                  Out of Stock
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
